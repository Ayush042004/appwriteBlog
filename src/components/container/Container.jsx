import React from "react";
// this comp is for whole the actual project lies under it thats why we passed chidren as prop and refrence
function Container ({children}) {
    return <div className="w-full max-w-7xl mx-auto px-4">
        {children}
    </div>;  
}

export default Container