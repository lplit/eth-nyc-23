const contracts = {
  31337: [
    {
      chainId: "31337",
      name: "localhost",
      contracts: {
        Crowdfunding: {
          address: "0x0165878A594ca255338adfa4d48449f69242Eb8F",
          abi: [
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "recipient",
                  type: "address",
                },
              ],
              name: "CreatorPaid",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "contributor",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "currentTotal",
                  type: "uint256",
                },
              ],
              name: "FundingReceived",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "contractAddress",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "projectStarter",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "projectTitle",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "projectDesc",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "goalAmount",
                  type: "uint256",
                },
              ],
              name: "ProjectStarted",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "projectIndex",
                  type: "uint256",
                },
              ],
              name: "checkIfFundingCompleteOrExpired",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "projectIndex",
                  type: "uint256",
                },
              ],
              name: "contribute",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "projectIndex",
                  type: "uint256",
                },
              ],
              name: "getProject",
              outputs: [
                {
                  internalType: "address payable",
                  name: "projectStarter",
                  type: "address",
                },
                {
                  internalType: "string",
                  name: "projectTitle",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "projectDesc",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
                {
                  internalType: "enum Crowdfunding.State",
                  name: "currentState",
                  type: "uint8",
                },
                {
                  internalType: "uint256",
                  name: "currentAmount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "goalAmount",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "returnAllProjects",
              outputs: [
                {
                  components: [
                    {
                      internalType: "address payable",
                      name: "creator",
                      type: "address",
                    },
                    {
                      internalType: "uint256",
                      name: "amountGoal",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "completeAt",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "currentBalance",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "raiseBy",
                      type: "uint256",
                    },
                    {
                      internalType: "string",
                      name: "title",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "description",
                      type: "string",
                    },
                    {
                      internalType: "enum Crowdfunding.State",
                      name: "state",
                      type: "uint8",
                    },
                  ],
                  internalType: "struct Crowdfunding.Project[]",
                  name: "",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "title",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "description",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "durationInDays",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountToRaise",
                  type: "uint256",
                },
              ],
              name: "startProject",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "state",
              outputs: [
                {
                  internalType: "enum Crowdfunding.State",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
