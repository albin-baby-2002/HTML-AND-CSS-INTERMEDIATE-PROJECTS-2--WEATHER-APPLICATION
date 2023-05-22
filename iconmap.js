export  const iconMap = new Map();


addIcon([0, 1], "fa-sun")
addIcon([2], "fa-cloud-sun")
addIcon([3], "fa-cloud")
addIcon([45, 48], "fa-smog")
addIcon(
  [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82],
  "fa-cloud-showers-heavy"
)
addIcon([71, 73, 75, 77, 85, 86], "fa-snowflake")
addIcon([95, 96, 99], "fa-cloud-bolt")

function addIcon( values, iconString){
    values.forEach(value => {
        iconMap.set(value, iconString)
        
    });

}

