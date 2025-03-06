import React from "react";

export async function fetchMaxLifts(user) {
        const response = await fetch(`/api/max-lifts/${user}`);
        return await response.json();
}