import { IS_EASY_MODE, IS_HARD_MODE, IS_NORMAL_MODE, SORT_LIST } from "../Util/Setting";

export const handleFilterByMode = (nonogramFilter, CheckOption) => {
    let nonogramEasy = undefined;
    let nonogramNormal = undefined;
    let nonogramHard = undefined;
    let nonogramNew = [];
    CheckOption.forEach((checkItem) => {
        if (checkItem === "easy") {
            nonogramEasy = nonogramFilter.filter((item) => {
                return IS_EASY_MODE(item.rows, item.cols);
            })
        }
        if (checkItem === "normal") {
            nonogramNormal = nonogramFilter.filter((item) => {
                return IS_NORMAL_MODE(item.rows, item.cols);
            })
        }
        if (checkItem === "hard") {
            nonogramHard = nonogramFilter.filter((item) => {
                return IS_HARD_MODE(item.rows, item.cols);
            })
        }
    })
    if (nonogramEasy) {
        nonogramNew.push(...nonogramEasy);
    }
    if (nonogramNormal) {
        nonogramNew.push(...nonogramNormal);
    }
    if (nonogramHard) {
        nonogramNew.push(...nonogramHard);
    }
    if (nonogramEasy || nonogramNormal || nonogramHard) {
        return nonogramNew
    }
    else {
        return undefined
    }
}

export const handleFilterBySort = (nonogramFilter, sortOption) => {
    SORT_LIST.forEach((sortItem, index) => {
        if (sortOption === sortItem) {
            switch (index) {
                case 0: {
                    return nonogramFilter.sort((a, b) => b.meta.votes.length - a.meta.votes.length)
                }
                case 1: {
                    return nonogramFilter.sort((a, b) => a.meta.votes.length - b.meta.votes.length)
                }
                case 2: {
                    return nonogramFilter.sort((a, b) => b.meta.played.quantity - a.meta.played.quantity)

                }
                case 3: {
                    return nonogramFilter.sort((a, b) => a.meta.played.quantity - b.meta.played.quantity)
                }

                default: {
                    return false;
                }
            }

        }
    })
}

export const handleFilterBySearch = (nonogramFilter, searchText) => {
    const newSearchText = searchText.toLowerCase();
    return  nonogramFilter.filter(({ name }) => {
        name = name.toLowerCase();
        return name.includes(newSearchText);
    });
    
}