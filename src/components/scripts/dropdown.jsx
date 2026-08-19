import * as utils from "../utils"
import "./dropdown.css"

const dropdown = (list, setter, choice, handler, jump) => {

    const listCompiled = Object.entries(list)
        .filter(([key, value]) => utils.notString(value))
        .map(([groupKey, group]) => {

            const listItems = Object.entries(group)
                .filter(([key, value]) => key !== "type" && Array.isArray(value))
                .flatMap(([subgroupKey, items]) => items.filter(utils.isString).map((item) => {
                    const inputId = `${groupKey}-${subgroupKey}-${item}`

                    return (
                        <div key={inputId}>
                            <input type="checkbox" id={inputId} key={inputId}
                                value={item} />
                            <label htmlFor={inputId}>{item}</label>
                        </div>
                    )
                }))

            return (
                <div className="nested-dropdown" key={groupKey}>
                    <p className="nested-dropdown-sub">{group.type}</p>
                    <div
                        className="nested-dropdown-content">
                        {listItems}
                    </div>
                </div>
            )
        })


    return (
        <div>
            <div className="dropdown">
                <div className="dropdown-label">{choice}</div>
                <button className="dropbtn">Select Items</button>
                <div className="dropdown-content">
                    {listCompiled}
                </div>
            </div>

            <button onClick={handler} className="submit-btn" data-jump={jump} data-set={setter}>Submit</button>
        </div>


    )
}

export default dropdown