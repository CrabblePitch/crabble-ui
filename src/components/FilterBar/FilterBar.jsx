import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined';

import './FilterBar.scss';

export const FilterBar = () => {
    return (
        <div className="filter-bar">
            <div className="filter-options">
                <button>Ticket</button>
                <button>Education</button>
                <button>Gaming</button>
                <button>Discount</button>
            </div>
            <div className="filter-btns">
                <button>
                    <FilterAltOutlinedIcon />
                </button>
                <button>
                    <SwapVertOutlinedIcon />
                </button>
            </div>
        </div>
    );
};
