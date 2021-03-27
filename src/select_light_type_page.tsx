import React from "react";
import {
  SelectGeneralLightButton,
  SelectAnnualLightButton,
  SelectCeremonyButton
} from "./add_user_button";

type Props = {};

export const SelectLightTypePage = (_props: Props) => {
  return (
    <div style={{ margin: "50px" }}>
      <SelectGeneralLightButton />
      <SelectCeremonyButton />
      <SelectAnnualLightButton />
    </div>
  );
};
