const contracts = {
  31337: [
    {
      chainId: "31337",
      name: "localhost",
      contracts: {
        Crowdfunding: {
          address: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
          abi: [
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "contractAddress",
                  type: "address",
                },
                {
                  indexed: false,
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
                  name: "index",
                  type: "uint256",
                },
              ],
              name: "getProject",
              outputs: [
                {
                  internalType: "contract Project",
                  name: "",
                  type: "address",
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
                  internalType: "contract Project[]",
                  name: "",
                  type: "address[]",
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
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
