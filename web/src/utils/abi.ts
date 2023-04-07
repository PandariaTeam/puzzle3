const abi = [
  {
    inputs: [
      { internalType: 'address', name: 'puzzleAddress', type: 'address' },
      { internalType: 'address', name: 'creator', type: 'address' }
    ],
    name: 'PuzzleHasBeenRegistered',
    type: 'error'
  },
  {
    inputs: [
      { internalType: 'address', name: 'instanceAddress', type: 'address' }
    ],
    name: 'PuzzleInstanceHasBeenCompleted',
    type: 'error'
  },
  {
    inputs: [
      { internalType: 'address', name: 'instanceAddress', type: 'address' }
    ],
    name: 'PuzzleInstanceNotExistsOrOwned',
    type: 'error'
  },
  { inputs: [], name: 'PuzzleInstanceSubmitContractWrong', type: 'error' },
  { inputs: [], name: 'PuzzleInstanceSubmitQuestionsWrong', type: 'error' },
  {
    inputs: [
      { internalType: 'address', name: 'puzzleAddress', type: 'address' },
      { internalType: 'address', name: 'creator', type: 'address' }
    ],
    name: 'PuzzleInvalid',
    type: 'error'
  },
  {
    inputs: [
      { internalType: 'address', name: 'puzzleAddress', type: 'address' }
    ],
    name: 'PuzzleNotExistsOrOwned',
    type: 'error'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'puzzleAddress',
        type: 'address'
      },
      { indexed: false, internalType: 'bool', name: 'available', type: 'bool' }
    ],
    name: 'PuzzleAvailableChange',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'solver',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'instanceAddress',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'puzzleAddress',
        type: 'address'
      }
    ],
    name: 'PuzzleInstanceCreate',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'solver',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'instanceAddress',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'puzzleAddress',
        type: 'address'
      },
      { indexed: false, internalType: 'bool', name: 'completed', type: 'bool' }
    ],
    name: 'PuzzleInstanceSubmit',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'creator',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'puzzleAddress',
        type: 'address'
      }
    ],
    name: 'PuzzleRegister',
    type: 'event'
  },
  {
    inputs: [
      { internalType: 'contract BasePuzzle', name: '_puzzle', type: 'address' },
      { internalType: 'bool', name: 'available', type: 'bool' }
    ],
    name: 'changePuzzleAvailable',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'contract BasePuzzle', name: '_puzzle', type: 'address' }
    ],
    name: 'createPuzzleInstance',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: '_puzzleAddress', type: 'address' }
    ],
    name: 'getPuzzleInstancesByPuzzleAddress',
    outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: '_creator', type: 'address' }],
    name: 'getPuzzlesByCreator',
    outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getTotalPuzzleList',
    outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'instances',
    outputs: [
      { internalType: 'address', name: 'instanceAddress', type: 'address' },
      { internalType: 'address', name: 'solver', type: 'address' },
      { internalType: 'uint256', name: 'createdAt', type: 'uint256' },
      { internalType: 'uint256', name: 'completedAt', type: 'uint256' },
      { internalType: 'contract BasePuzzle', name: 'puzzle', type: 'address' },
      { internalType: 'bool', name: 'completed', type: 'bool' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'puzzles',
    outputs: [
      { internalType: 'address', name: 'puzzleAddress', type: 'address' },
      { internalType: 'address', name: 'creator', type: 'address' },
      { internalType: 'bool', name: 'available', type: 'bool' },
      { internalType: 'uint256', name: 'registerAt', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'instanceCreatedCount',
        type: 'uint256'
      },
      { internalType: 'uint256', name: 'instanceSolvedCount', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'contract BasePuzzle', name: '_puzzle', type: 'address' }
    ],
    name: 'registerPuzzle',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address payable', name: '_instance', type: 'address' }
    ],
    name: 'submitPuzzleInstance',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];
export { abi };
