// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Crowdfunding {
	// Data structures
	enum State {
		Fundraising,
		Expired,
		Successful
	}

	// Event that will be emitted whenever a new project is started
	event ProjectStarted(
		address indexed contractAddress,
		address indexed projectStarter,
		string projectTitle,
		string projectDesc,
		uint256 deadline,
		uint256 goalAmount
	);

	// Event that will be emitted whenever funding is received
	event FundingReceived(
		address indexed contributor,
		uint amount,
		uint currentTotal
	);

	// Event that will be emitted whenever the project starter has received the funds
	event CreatorPaid(address recipient);

	// State variables
	Project[] private projects;

	// Modifier to check current state
	modifier inState(State _state) {
		require(state == _state);
		_;
	}

	// Modifier to check if the function caller is the project creator
	modifier isCreator(uint projectIndex) {
		require(msg.sender == projects[projectIndex].creator);
		_;
	}

	struct Project {
		address payable creator;
		uint amountGoal; // required to reach at least this much, else everyone gets refund
		uint completeAt;
		uint256 currentBalance;
		uint raiseBy;
		string title;
		string description;
		State state;
	}

	// State variables
	State public state = State.Fundraising; // initialize on create

	// Function to start a new project
	function startProject(
		string calldata title,
		string calldata description,
		uint durationInDays,
		uint amountToRaise
	) external {
		uint raiseUntil = block.timestamp + durationInDays * 1 days;

		Project memory newProject = Project(
			payable(msg.sender),
			amountToRaise,
			0,
			0,
			raiseUntil,
			title,
			description,
			State.Fundraising
		);
		projects.push(newProject);
		emit ProjectStarted(
			address(this),
			msg.sender,
			title,
			description,
			raiseUntil,
			amountToRaise
		);
	}

	// Function to get all projects' contract addresses
	function returnAllProjects() external view returns (Project[] memory) {
		return projects;
	}

	// Function to get a particular project details
	function getProject(
		uint projectIndex
	)
		public
		view
		returns (
			address payable projectStarter,
			string memory projectTitle,
			string memory projectDesc,
			uint256 deadline,
			State currentState,
			uint256 currentAmount,
			uint256 goalAmount
		)
	{
		require(projectIndex < projects.length);
		Project storage project = projects[projectIndex];
		return (
			project.creator,
			project.title,
			project.description,
			project.raiseBy,
			project.state,
			project.currentBalance,
			project.amountGoal
		);
	}

	// Function to fund a certain project
	function contribute(
		uint projectIndex
	) external payable inState(State.Fundraising) {
		require(projectIndex < projects.length);
		Project storage project = projects[projectIndex];
		require(msg.sender != project.creator);
		// Add the contribution to the contributions array
		project.currentBalance += msg.value;
		emit FundingReceived(msg.sender, msg.value, project.currentBalance);
		checkIfFundingCompleteOrExpired(projectIndex);
	}

	// Function to change the project state depending on conditions
	function checkIfFundingCompleteOrExpired(uint projectIndex) public {
		require(projectIndex < projects.length);
		Project storage project = projects[projectIndex];

		if (project.currentBalance >= project.amountGoal) {
			project.state = State.Successful;
			payOut(projectIndex);
		} else if (block.timestamp > project.raiseBy) {
			project.state = State.Expired;
		}
		project.completeAt = block.timestamp;
	}

	// Function to give the received funds to project starter
	function payOut(uint projectIndex) internal inState(State.Successful) {
		require(projectIndex < projects.length);
		Project storage project = projects[projectIndex];
		uint256 totalRaised = project.currentBalance;
		project.currentBalance = 0;

		if (project.creator.send(totalRaised)) {
			emit CreatorPaid(project.creator);
		} else {
			project.currentBalance = totalRaised;
			project.state = State.Successful;
		}
	}
}
