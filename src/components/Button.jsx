import React from "react";
// THIS IS PRDOCATION BASED BUTTON COMPONENTS LIKE UI LIBRARIES 
export default function Button({
    children,  // we used children as prop bcoz we can add more jsx comp in it and reuse it 
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    );
}