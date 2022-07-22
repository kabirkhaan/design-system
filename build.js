const StyleDictionaryPackage = require('style-dictionary');

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED

function getStyleDictionaryConfig(brand, platform) {
    return {
        "source": [
            `tokens/brands/${brand}/*.json`,
            `tokens/**/**/*.json`,
        ],
        "platforms": {
            "android": {
                "buildPath": `build/${brand}/android/`,
                "transformGroup": "android",
                "files": [{
                  "destination": "tokens_colors.xml",
                  "format": "android/colors"
                },{
                  "destination": "tokens_font_dimens.xml",
                  "format": "android/fontDimens"
                },{
                  "destination": "tokens_dimens.xml",
                  "format": "android/dimens"
                },{
                  "destination": "tokens_integers.xml",
                  "format": "android/integers"
               },{
                  "destination": "tokens_strings.xml",
                  "format": "android/strings"
                },{
                  "destination":"Color.kt",
                  "format": "compose/object",
                  "className":"Color",
                  "filter":{
                     "attributes":{
                        "category":"font"
                     }
                  }
               },{
                  "destination":"Size.kt",
                  "format": "compose/object",
                  "className":"Size",
                  "type":"float",
                  "filter":{
                     "attributes":{
                        "category":"size"
                     }
                  }
               },{
                  "destination":"Fonts.kt",
                  "format": "compose/object",
                  "className":"FontName",
                  "filter":{
                     "attributes":{
                        "category":"font"
                     }
                  }
               },{
                 "destination":"Components.kt",
                 "format": "compose/object",
                 "className":"Components",
                 "filter":{
                    "attributes":{
                       "category":"component"
                    }
                 }
              }
              ]
            },
            
            "ios": {
                "transformGroup": "ios-swift-separate",
                "buildPath": `build/${brand}/ios/`,
                "files":[{
                     "destination":"Color.swift",
                     "format":"ios-swift/enum.swift",
                     "className":"Color",
                     "filter":{
                        "attributes":{
                           "category":"font"
                        }
                     }
                  },{
                     "destination":"Size.swift",
                     "format":"ios-swift/enum.swift",
                     "className":"Size",
                     "type":"float",
                     "filter":{
                        "attributes":{
                           "category":"size"
                        }
                     }
                  },{
                     "destination":"Fonts.swift",
                     "format":"ios-swift/enum.swift",
                     "className":"FontName",
                     "filter":{
                        "attributes":{
                           "category":"font"
                        }
                     }
                  },{
                    "destination":"Components.swift",
                    "format":"ios-swift/enum.swift",
                    "className":"Components",
                    "filter":{
                       "attributes":{
                          "category":"component"
                       }
                    }
                 }
                ]
            },
        }
    };
}

console.log('Build started...');

// PROCESS THE DESIGN TOKENS FOR THE DIFFERENT BRANDS AND PLATFORMS

['brand1', 'brand2', 'brand3'].map(function(brand) {
    ['ios', 'android'].map(function(platform) {

        console.log('\n==============================================');
        console.log(`\nProcessing: [${platform}] [${brand}]`);

        const StyleDictionary = StyleDictionaryPackage.extend(
            getStyleDictionaryConfig(brand, platform)
        );

        StyleDictionary.buildPlatform(platform);

        console.log('\nEnd processing');

    })
})

console.log('\n==============================================');
console.log('\nBuild completed!');