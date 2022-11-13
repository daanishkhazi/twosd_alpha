//global.d.ts
import React from "react";

declare module "react" {
  interface CSSProperties {
    "--value"?: string | number;
    "--size"?: string | number;
    "--thickness"?: string | number;
  }
}