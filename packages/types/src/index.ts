export enum Puzzle3Difficulty {
  Easy = 1,
  Medium,
  Hard,
  Expert
}

export interface IPuzzle3Metadata {
  /**
   * Name of the puzzle
   */
  name: string;
  /**
   * Author of the puzzle
   * @description ethereum address or ens name
   */
  author: string;
  /**
   * Timestamp of creation
   */
  created: number;
  /**
   * Difficulty of the puzzle
   */
  difficulty: Puzzle3Difficulty;
  /**
   * Description of the puzzle
   * @description Markdown Content
   */
  description: string;
  /**
   * Description of the puzzle when completed
   * @description Markdown Content
   */
  completedDescription: string;
  /**
   * Contract Content
   * @description Solidity Content
   */
  contract: string;
  /**
   * Show the contract code in the UI
   * @default true
   */
  revealCode?: boolean;
  /**
   * Contract Deploy Parameters
   */
  deployParams: any[];
  /**
   * Formily JSON Schema
   */
  formSchema: any;
}

export const name = '@puzzle3/types';
