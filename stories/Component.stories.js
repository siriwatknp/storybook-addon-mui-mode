import React from "react";
import { GoogleFontSelect } from "../src/components";

export * from "../src/components";

export default {
  title: "Component",
  parameters: {
    googleFont: "Spartan",
  },
};

GoogleFontSelect.args = { apiKey: process.env.GOOGLE_FONT_API_KEY };
