const StyleDictionaryPackage = require('style-dictionary');

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED

function getStyleDictionaryConfig(brand, platform) {
  return {
    "source": [
      `atoms/brands/${brand}/*.json`,
      "atoms/globals/**/*.json",
      `atoms/platforms/${platform}/*.json`
    ],
    "platforms": {
      "web": {
        "transformGroup": "web",
        "buildPath": `build/web/${brand}/`,
        "files": [{
          "destination": "tokens.scss",
          "format": "scss/variables"
        }]
      },
      "android": {
        "transformGroup": "android",
        "buildPath": `build/android/${brand}/`,
        "files": [{
          "destination": "tokens.colors.xml",
          "format": "android/colors"
        },{
          "destination": "tokens.dimens.xml",
          "format": "android/dimens"
        },{
          "destination": "tokens.font_dimens.xml",
          "format": "android/fontDimens"
        }]
      },
      "ios": {
        "transformGroup": "ios",
        "buildPath": `build/ios/${brand}/`,
        "files": [{
          "destination": "Atoms.swift",
          "format": "ios-swift/enum.swift"
        }]
      }
    }
  };
}

console.log('Build started...');

// PROCESS THE DESIGN TOKENS FOR THE DIFFERENT BRANDS AND PLATFORMS

['arval', 'bmw', 'sixt'].map(function (brand) {
  ['web', 'ios', 'android'].map(function (platform) {

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
