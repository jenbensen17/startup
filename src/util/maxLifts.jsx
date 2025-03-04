import React from "react";

export async function fetchMaxLifts() {
        const response = await fetch('/api/max-lifts');
        return await response.json();
}