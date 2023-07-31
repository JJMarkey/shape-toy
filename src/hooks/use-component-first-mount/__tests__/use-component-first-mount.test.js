import { test, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import useComponentFirstMount from "../use-component-first-mount"
;
test("useComponentFirstMount only increments on render", ()=>{
    let mountVar = 1;

    const {rerender} = renderHook(()=>useComponentFirstMount(()=>{mountVar++}))
    
    expect(mountVar).toBe(2);
    rerender();
    expect(mountVar).toBe(2);
    
})