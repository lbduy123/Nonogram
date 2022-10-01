

export const IS_EASY_MODE =  (rows,cols) => ((rows+cols)/2 >=5 &&(rows+cols)/2 <10);
export const IS_NORMAL_MODE = (rows,cols) => ((rows+cols)/2 >=10 &&(rows+cols)/2 <20);
export const IS_HARD_MODE =  (rows,cols) => ((rows+cols)/2 >=20);

export const SORT_LIST = ['Liked: High To Low', 'Liked: Low To High', 'Played: High To Low', 'Played: Low To Low'];

export const MODE_LIST = ['all', 'easy', 'normal', 'hard'];

export const MAX_ITEM_PER_PAGE = 10;

export const renderGameMode = (rows,cols) =>{
    if(IS_EASY_MODE(rows,cols)){
        return "easy"
    }
    if(IS_NORMAL_MODE(rows,cols)){
        return "normal"
    }
    if(IS_HARD_MODE(rows,cols)){
        return "hard"
    }
}