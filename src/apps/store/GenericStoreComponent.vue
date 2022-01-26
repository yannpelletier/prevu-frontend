<script>
  import {isString, forEach, isArray} from "lodash";
    let tinycolor = require("tinycolor2");

    export default {
        name: "GenericStoreComponent",
        computed: {
            componentAttributes() {
                return (sectionId, includedSectionIds) => {
                    let attributes = {
                        sections: this.sections,
                        parameters: this.parameters,
                        ...(this.parameters),
                    };

                    if (sectionId && this.sections[sectionId]) {
                        attributes = {
                            variant: this.sections[sectionId].variant,
                            ...this.sections[sectionId].parameters,
                            ...attributes,
                        };
                    }

                    if (includedSectionIds) {
                        if (isString(includedSectionIds)) {
                            includedSectionIds = [includedSectionIds];
                        }

                        if(isArray(includedSectionIds)){
                            forEach(includedSectionIds, (value) => {
                                if(this.sections[value]){
                                    attributes = {
                                        ...this.sections[value].parameters,
                                        ...attributes,
                                    };
                                }
                            });
                        }
                    }

                    return attributes;
                };
            },

            alphaColor() {
                  return (rgb, alpha) => {
                      let color = tinycolor(rgb);
                      color.setAlpha(alpha);
                      return color.toRgbString();
                  };
            },
            isLight() {
                return (checkedColor) => {
                    return tinycolor(checkedColor).isLight();
                };
            },
            isDark() {
                return (checkedColor) => {
                    return tinycolor(checkedColor).isDark();
                };
            },
            //Return the light color if the checked color is darker than ligher and the dark color otherwise
            //This is to ensure that text is always readable no matter what background it is on
            pivotColor() {
                return (checkedColor, lightColor, darkColor) => {
                    let usedLightColor = lightColor ? lightColor : '#FFFFFF';
                    let usedDarkColor = darkColor ? darkColor : '#000000';
                    return tinycolor(checkedColor).isDark() ? usedLightColor : usedDarkColor;
                };
            },
        },
        props: {
            sections: {
                type: Object,
            },
            parameters: {
                type: Object,
            },
        },
    }
</script>
