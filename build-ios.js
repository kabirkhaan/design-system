const StyleDictionaryPackage = require('style-dictionary');


// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED

function getStyleDictionaryConfig(brand, platform) {
    return {
        "source": [
            `tokens/brands/${brand}/*.json`,
            `tokens/global/**/*.json`,
            `tokens/components/**/*.json`,
        ],
        "platforms": {
            "ios": {
                "transformGroup": "custom/ios-swift",
                "buildPath": `build/${brand}/ios/`,
                "files":[{
                     "destination":"Color.swift",
                     "format":"ios-swift/enum.swift",
                     "className":"Color",
                     "filter":{
                        "attributes":{
                           "category":"color"
                        }
                     }
                  }, 
                  ,{
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
    ['ios'].map(function(platform) {

        console.log('\n==============================================');
        console.log(`\nProcessing: [${platform}] [${brand}]`);

        const StyleDictionary = StyleDictionaryPackage.extend(
            getStyleDictionaryConfig(brand, platform)
        );

        StyleDictionary.registerTransform({
            name: 'color/ColorSwiftHex',
            type: 'value',
            transitive: true,
            matcher: function(token) {
                return typeof token.value === 'string' ? token.value.startsWith('#') : false;
            },
            transformer: function(token) {
                return "UIColor(hex:".concat(" ", token.original.value.replace('#', '0x'), ")");
            }
         });
        
         StyleDictionary.registerTransformGroup({
            name: 'custom/ios-swift',
            transforms: [
              'attribute/cti',
              'name/ti/camel',
              'content/swift/literal',
              'asset/swift/literal',
              'size/swift/remToCGFloat',
              'font/swift/literal',
              'color/ColorSwiftHex', // Custom color
            ]
          });

        StyleDictionary.buildPlatform(platform);

        console.log('\nEnd processing');

    })
})

console.log('\n==============================================');
console.log('\nBuild completed!');