import { PastResult } from "./past-scores.model";

export interface Team {
    
        id: number;
        abbreviation?: string;
        city?: string;
        conference?: string;
        division?: string;
        full_name?: string;
        name?:string;
        logoUrl?:string;
        scoredPoints?:number;
        concededPoints?:number;
        avgPtsScored?:number;
        avgPtsConceded?:number
      
}
export interface pastScoreWithResult{
    team:Team;
    past12daysResults?:PastResult[]

}
export interface GamesResponse {
    data:PastResult [];
    meta: Meta;
  }
  export interface Meta {
    total_pages: number;
    current_page: number;
    next_page: number;
    per_page: number;
    total_count: number;
  }