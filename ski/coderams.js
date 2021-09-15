import * as THREE2 from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/examples/jsm/controls/OrbitControls.js';
import { BufferGeometryUtils } from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/examples/jsm/utils/BufferGeometryUtils.js';

var running = false;
var mouseY = 0;
var mouseX = 0;
var startX = -1;
var startY = -1;


/*var stats = [
  ["BRISTOL MOUNTAIN", "Canandaigua, NY", 1200, 34, 6, 0, 1345, 1295, 1410, 420],
  ["GORE MOUNTAIN", "North Creek, NY", 2537, 110, 14, 1, 557, 729, 447, 388],
  ["SONG MOUNTAIN", "Tully, NY", 700, 24, 5, 2, -1, -1, -1, -1],
  ["TOGGENBURG", "Fabius, NY", 700, 22, 5, 3, -1, -1, -1, -1],
  ["GREEK PEAK", "Virgil, NY", 952, 55, 8, 4, 1397, 1059, 1580, 567],
  ["KILLINGTON", "Killington, VT", 3050, 155, 22, 5, 2314, 1652, 2826, 1082],
  ["ELK MOUNTAIN", "Union Dale, PA", 1000, 27, 7, 6, 1270, 1146, 971, 513],
  ["LABRADOR MOUNTAIN", "Truxton, NY", 700, 24, 3, 7, 619, 1095, 544, 473],
  ["HOLIDAY VALLEY", "Ellicottville, NY", 750, 60, 13, 8, 1607, 820, 2116, 704],
  ["BIG SKY", "Bozeman, MT", 4350, 317, 36, 9, 2392 , 1761, 2008, 1120],
  ["OKEMO", "Ludlow, VT", 2200, 121, 20, 10, 2011, 1017, 1826, 452],
  ["SNOW RIDGE", "Turin, NY", 650, 24, 6, 11, -1, -1, -1, -1],
  ["WHITEFACE MOUNTAIN", "Wilmington, NY", 3430, 89, 12, 12, 1453, 929, 1831, 306],
  ["SUGARLOAF", "Carabassett Valley, ME", 2820, 162, 13, 13, 3391, 2424, 2872, 1223],
  ["REVELSTOKE", "Revelstoke, BC", 5620, 59, 6, 14, -1, -1, -1, -1],
  ["WOODS VALLEY", "Westernville, NY", 500, 21, 6, 15, -1, -1, -1, -1],
  ["SMUGGLERS NOTCH", "Cambridge, VT", 2610, 78, 8, 16, 1075, 1239, 1617, 699],
  ["HEAVENLY", "Heavenly, CA", 3500, 97, 28, 17, 2627, 1557, 2509, 1164],
  ["SWAIN", "Swain, NY", 650, 35, 5, 18, 878, 1017, 895, 740],
  ["HUNTER MOUNTAIN", "Hunter, NY", 1600, 67, 13, 19, 2043, 329, 1383, 350]
];*/

var stats = [
  ["AFTON ALPS", "Hastings, MN", 350, 48, 21, 0, 570, 706, 844, 357, 1],
  ["ALTA", "Alta, UT", 2538, 119, 6, 1, 1367, 2046, 972, 1328, 2],
  ["ALYESKA", "Anchorage, AK", 2500, 76, 7, 2, 1766, 1528, 1370, 911, 2],
  ["ANGEL FIRE", "Angel Fire, NM", 2077, 81, 7, 3, 2218, 1358, 917, 517, 2],
  ["ANTHONY LAKES", "Rock Creek, OR", 900, 21, 3, 4, 1184, 870, 1217, 334, 1],
  ["ARAPAHOE BASIN", "Dillon, CO", 2530, 147, 9, 5, 452, 1630, 713, 1153, 2],
  ["ARIZONA SNOWBOWL", "Flagstaff, AZ", 2300, 55, 8, 6, 1076, 1897, 1069, 588, 2],
  ["ASPEN SNOWMASS", "Aspen, CO", 4406, 336, 40, 7, 1289, 1915, 2060, 1205, 4],
  ["ATTITASH", "Bartlett, NH", 1750, 68, 9, 8, 1994, 1356, 1939, 296, 2],
  ["BEAR CREEK", "Longswamp, PA", 510, 23, 6, 9, 796, 725, 500, 206, 1],
  ["BEAR VALLEY", "Bear Valley, CA", 1900, 56, 10, 10, 1793, 1277, 1603, 843, 2],
  ["BEAVER CREEK", "Eagle-Vail, CO", 3340, 150, 24, 11, 1348, 1516, 885, 857, 4],
  ["BEAVER MOUNTAIN", "Garden, UT", 1600, 48, 6, 12, 1789, 1283, 1953, 489, 1],
  ["BELLEAYRE", "Highmount, NY", 1404, 50, 8, 13, 1071, 1172, 972, 310, 2],
  ["BERKSHIRE EAST", "Charlemont, MA", 1180, 38, 5, 14, 745, 961, 778, 304, 1],
  ["BIG BOULDER", "Lake Harmony, PA", 600, 8, 8, 15, 814, 856, 650, 322, 1],
  ["BIG SKY", "Bozeman, MT", 4350, 317, 36, 16, 2393, 1762, 2009, 1120, 4],
  ["BLACKTAIL MOUNTAIN", "Lakeside, MT", 1440, 27, 4, 17, 779, 1342, 482, 402, 2],
  ["BLUE HILLS", "Milton, MA", 309, 16, 4, 18, 682, 616, 883, 238, 1],
  ["BLUE KNOB", "Claysburg, PA", 1072, 34, 6, 19, 684, 1382, 1430, 462, 1],
  ["BLUE MOUNTAIN", "Danielsville, PA", 1082, 40, 16, 20, 918, 1125, 887, 238, 1],
  ["BLUEWOOD", "Dayton, WA", 1125, 26, 3, 21, 953, 1200, 833, 277, 1],
  ["BOGUS BASIN", "Horseshoe Bend, ID", 1800, 82, 10, 22, 1721, 678, 1462, 228, 2],
  ["BOLTON VALLEY", "Bolton, VT", 1704, 71, 6, 23, 1990, 1161, 1548, 735, 2],
  ["BOREAL", "Truckee, CA", 500, 34, 8, 24, 875, 1036, 724, 360, 1],
  ["BRECKENRIDGE", "Breckenridge, CO", 3398, 187, 34, 25, 1230, 2188, 819, 1682, 4],
  ["BRETTON WOODS", "Carroll, NH", 1500, 63, 10, 26, 1382, 1570, 1462, 519, 2],
  ["BRIAN HEAD", "Brian Head, UT", 1548, 71, 8, 27, 1335, 965, 545, 569, 2],
  ["BRIDGER BOWL", "Bridger, MT", 2600, 105, 11, 28, 1196, 1388, 1112, 937, 4],
  ["BRIGHTON", "Park City, UT", 1745, 66, 7, 29, 1453, 1497, 285, 1008, 2],
  ["BRISTOL MOUNTAIN", "Canandaigua, NY", 1200, 34, 6, 30, 1345, 1295, 1410, 420, 1],
  ["BROMLEY", "Peru, VT", 1334, 47, 9, 31, 872, 1401, 1450, 421, 1],
  ["BRUNDAGE", "McCall, ID", 1800, 67, 6, 32, 1352, 1439, 1260, 517, 2],
  ["BUCK HILL", "Burnsville, MN", 309, 16, 10, 33, 554, 604, 516, 260, 1],
  ["BUENA VISTA", "Puposky, MN", 230, 17, 6, 34, 642, 621, 437, 481, 1],
  ["BURKE MOUNTAIN", "Burke, VT", 2011, 52, 5, 35, 1348, 1307, 1122, 250, 1],
  ["CAMDEN SNOW BOWL", "Camden, ME", 850, 20, 3, 36, 1369, 1003, 935, 302, 1],
  ["CAMELBACK", "Tannersville, PA", 800, 39, 16, 37, 1050, 869, 1141, 287, 1],
  ["CANAAN VALLEY", "Davis, WV", 850, 47, 4, 38, 960, 772, 773, 181, 1],
  ["CANNON MOUNTAIN", "Franconia, NH", 2180, 97, 11, 39, 1442, 1377, 641, 657, 2],
  ["CASCADE MOUNTAIN", "Caledonia, WI", 460, 47, 11, 40, 947, 754, 793, 226, 1],
  ["CATAMOUNT", "Hillsdale, NY", 1000, 38, 8, 41, 1126, 1094, 1231, 367, 1],
  ["COFFEE MILL", "Wabasha, MN", 425, 14, 3, 42, 872, 746, 511, 339, 1],
  ["COOPER", "Leadville North, CO", 1200, 59, 5, 43, 1472, 2448, 2174, 1823, 2],
  ["COPPER MOUNTAIN", "Copper Mountain, CO", 2738, 150, 24, 44, 1392, 2047, 1397, 1362, 4],
  ["CRANMORE MOUNTAIN", "Conway, NH", 1200, 57, 8, 45, 692, 1256, 1064, 410, 2],
  ["CRESTED BUTTE", "Crested Butte, CO", 3062, 121, 14, 46, 2789, 1472, 1694, 717, 2],
  ["CROTCHED MOUNTAIN", "Francestown, NH", 1016, 23, 5, 47, 789, 925, 803, 175, 1],
  ["CRYSTAL MOUNTAIN", "White River, WA", 3100, 86, 11, 48, 1603, 1397, 1548, 492, 2],
  ["DEER MOUNTAIN", "Terry, SD", 940, 63, 4, 49, 420, 1039, 908, 358, 1],
  ["DEER VALLEY", "Park City, UT", 3000, 103, 21, 50, 1248, 1571, 1493, 890, 2],
  ["DEVILS HEAD", "Greenfield, WI", 500, 23, 9, 51, 953, 774, 948, 498, 1],
  ["DIAMOND PEAK", "Incline Village, NV", 1840, 30, 7, 52, 1406, 1280, 750, 520, 1],
  ["DISCOVERY", "Granite, MT", 2380, 74, 8, 53, 2124, 1659, 2644, 1332, 2],
  ["DODGE RIDGE", "Pinecrest, CA", 1600, 67, 12, 54, 1679, 728, 870, 277, 2],
  ["DONNER SKI RANCH", "Truckee, CA", 750, 52, 8, 55, 417, 691, 847, 679, 1],
  ["EAGLE ROCK", "Weston, PA", 550, 14, 3, 56, 845, 933, 611, 285, 1],
  ["ECHO MOUNTAIN", "Idaho Springs, CO", 600, 9, 3, 57, 969, 904, 781, 284, 1],
  ["ELDORA", "Eldora, CO", 1400, 65, 10, 58, 632, 1161, 1169, 521, 2],
  ["ELK MOUNTAIN", "Union Dale, PA", 1000, 27, 7, 59, 1272, 1149, 970, 514, 1],
  ["GIANTS RIDGE", "Biwabik, MN", 500, 35, 7, 60, 853, 758, 702, 244, 1],
  ["GORE MOUNTAIN", "North Creek, NY", 2537, 110, 61, 14, 1171, 1699, 905, 752, 2],
  ["GRAND TARGHEE", "Alta, WY", 2270, 97, 5, 62, 1121, 1608, 1571, 890, 2],
  ["GRANITE PEAK", "Wausau, WI", 700, 58, 5, 63, 800, 1117, 1053, 443, 1],
  ["GREAT DIVIDE", "Marysville, MT", 1580, 110, 6, 64, 1473, 1565, 1670, 1470, 2],
  ["GREEK PEAK", "Virgil, NY", 952, 55, 8, 65, 1370, 1052, 1559, 541, 4],
  ["GUNSTOCK", "Gilford, NH", 1400, 48, 7, 66, 1493, 1377, 1154, 236, 2],
  ["HEAVENLY", "Heavenly, CA", 3500, 97, 28, 67, 2626, 1555, 2507, 1165, 4],
  ["HOGADON BASIN", "Casper Mountain, WY", 640, 28, 2, 68, 947, 1053, 690, 376, 1],
  ["HOLIDAY VALLEY", "Ellicottville, NY", 750, 60, 13, 69, 742, 748, 1492, 551, 1],
  ["HOLIMONT", "Ellicottville, NY", 700, 55, 8, 70, 1084, 944, 1271, 398, 1],
  ["HOMEWOOD", "Homewood, CA", 1650, 67, 8, 71, 1500, 1520, 986, 1074, 2],
  ["HOODOO", "Santiam Junction, OR", 1035, 36, 6, 72, 969, 1388, 808, 744, 2],
  ["HOWELSEN HILL", "Steamboat Springs, CO", 440, 17, 4, 73, 903, 1462, 888, 1193, 1],
  ["HUNTER MOUNTAIN", "Hunter, NY", 1600, 67, 13, 74, 543, 1026, 1360, 470, 2],
  ["HYLAND HILLS", "Bloomington, MN", 175, 11, 7, 75, 510, 415, 481, 270, 1],
  ["JACK FROST", "Blakeslee, PA", 600, 18, 9, 76, 931, 991, 925, 401, 1],
  ["JACKSON HOLE", "Teton Village, WY", 4139, 133, 13, 77, 2336, 1769, 1281, 424, 2],
  ["JAY PEAK", "Jay, VT", 2153, 81, 9, 78, 1104, 1653, 1092, 378, 2],
  ["JIMINY PEAK", "Lanesborough, MA", 1150, 45, 9, 79, 1123, 1158, 987, 373, 2],
  ["JUNE MOUNTAIN", "June Lake, CA", 2590, 43, 7, 80, 818, 1691, 521, 289, 2],
  ["KELLY CANYON", "Heise, ID", 1000, 51, 6, 81, 1100, 1202, 1050, 344, 2],
  ["KEYSTONE", "Keystone, CO", 3128, 128, 20, 82, 663, 2083, 1244, 1972, 4],
  ["KILLINGTON", "Killington, VT", 3050, 155, 22, 83, 2026, 1272, 1727, 919, 2],
  ["KIRKWOOD", "Kit Carson, CA", 2000, 85, 12, 84, 1794, 1289, 1967, 719, 2],
  ["KISSING BRIDGE", "Glenwood, NY", 550, 39, 10, 85, 915, 889, 889, 385, 1],
  ["LABRADOR MOUNTAIN", "Truxton, NY", 700, 23, 4, 86, 999, 1052, 643, 500, 1],
  ["LEE CANYON", "Charleston, NV", 860, 27, 3, 87, 755, 1195, 1255, 849, 2],
  ["LIBERTY", "Carroll Valley, PA", 620, 21, 7, 88, 1463, 874, 972, 886, 1],
  ["LITTLE SWITZERLAND", "Slinger, WI", 200, 18, 8, 89, 864, 620, 643, 377, 1],
  ["LOOKOUT PASS", "Larson, ID", 1150, 38, 4, 90, 457, 1365, 800, 1072, 2],
  ["LOON MOUNTAIN", "Lincoln, NH", 2100, 61, 10, 91, 1670, 1574, 1481, 702, 2],
  ["LOST TRAIL", "Sula, MT", 1800, 69, 8, 92, 968, 1068, 848, 689, 2],
  ["LOST VALLEY", "Auburn, ME", 240, 31, 4, 93, 637, 662, 509, 452, 1],
  ["LOVELAND", "Keystone, CO", 2210, 94, 10, 94, 1654, 1097, 1631, 749, 2],
  ["LUTSEN MOUNTAINS", "Lutsen, MN", 825, 62, 8, 95, 1296, 1304, 856, 910, 2],
  ["MAD RIVER GLEN", "Fayston, VT", 2037, 52, 5, 96, 1379, 1427, 801, 285, 1],
  ["MAGIC MOUNTAIN", "Londonderry, VT", 1500, 50, 4, 97, 1091, 1253, 894, 178, 1],
  ["MAGIC MOUNTAIN", "Oakley, ID", 700, 11, 3, 98, 825, 834, 544, 234, 1],
  ["MAMMOTH MOUNTAIN", "Mammoth Lakes, CA", 3100, 150, 25, 99, 418, 1058, 1174, 945, 4],
  ["MAVERICK MOUNTAIN", "Elkhorn Hot Springs, MT", 2020, 22, 2, 100, 728, 1012, 1031, 257, 1],
  ["MEADOWLARK", "Meadowlark Lake, WY", 1000, 14, 2, 101, 1016, 1091, 1213, 249, 1],
  ["MISSION RIDGE", "Wenatchee Heights, WA", 2250, 53, 6, 102, 1529, 1094, 2390, 421, 2],
  ["MONARCH MOUNTAIN", "Monarch, CO", 1162, 64, 7, 103, 878, 1285, 1259, 923, 1],
  ["MONTAGE MOUNTAIN", "Scranton, PA", 1000, 26, 7, 104, 1247, 921, 1380, 394, 1],
  ["MONTANA SNOWBOWL", "Schley, MT", 2600, 37, 4, 105, 1329, 1237, 1274, 631, 2],
  ["MOUNT PETER", "Warwick, NY", 450, 18, 5, 106, 778, 793, 849, 236, 1],
  ["MOUNT SNOW", "Dover, VT", 1700, 87, 20, 107, 1374, 1690, 1660, 514, 2],
  ["MOUNT SUNAPEE", "Newbury, NH", 1510, 66, 10, 108, 1372, 1336, 998, 403, 2],
  ["MOUNTAIN HIGH", "Wrightwood, CA", 1600, 59, 14, 109, 1315, 1514, 1152, 823, 1],
  ["MT ABRAM", "Greenwood, ME", 1150, 54, 5, 110, 1362, 1377, 1342, 724, 1],
  ["MT ASHLAND", "Ashland, OR", 1150, 44, 5, 111, 843, 929, 1098, 414, 1],
  ["MT BACHELOR", "Elk Lake, OR", 3365, 121, 15, 112, 1857, 1939, 1766, 1378, 2],
  ["MT BAKER", "Whatcom, WA", 1500, 38, 10, 113, 723, 764, 764, 285, 2],
  ["MT BALDY", "Wrightwood, CA", 2100, 26, 4, 114, 1281, 471, 485, 640, 2],
  ["MT HOOD MEADOWS", "Hood River, OR", 2777, 85, 13, 115, 1411, 1911, 1256, 1328, 2],
  ["MT HOOD SKIBOWL", "Government Camp, OR", 1500, 69, 10, 116, 1160, 1153, 1210, 564, 2],
  ["MT JEFFERSON", "Lee, ME", 432, 12, 3, 117, 996, 771, 650, 240, 1],
  ["MT ROSE", "New Washoe City, NV", 1800, 65, 8, 118, 655, 912, 1093, 388, 2],
  ["MT SHASTA", "Mt. Shasta, CA", 1435, 32, 5, 119, 1338, 1284, 1536, 687, 1],
  ["MT SPOKANE", "Riverside, WA", 2000, 55, 8, 120, 643, 1143, 939, 756, 2],
  ["NASHOBA VALLEY", "Westford, MA", 240, 17, 11, 121, 586, 826, 707, 541, 1],
  ["NORDIC VALLEY", "Eden, UT", 960, 36, 5, 122, 1908, 802, 530, 150, 2],
  ["NORTHSTAR", "Truckee, CA", 2280, 100, 20, 123, 1117, 1006, 1292, 380, 2],
  ["OKEMO", "Ludlow, VT", 2200, 121, 20, 124, 1058, 1292, 1066, 413, 2],
  ["OTIS RIDGE", "Otis, MA", 400, 11, 4, 125, 456, 774, 685, 218, 1],
  ["PAJARITO", "Los Alamos, NM", 1410, 45, 6, 126, 1541, 1032, 1354, 393, 2],
  ["PARK CITY", "Park City, UT", 3226, 341, 44, 127, 1093, 1626, 728, 1219, 4],
  ["PEEK N PEAK", "French Creek, NY", 400, 27, 10, 128, 1245, 847, 1232, 319, 1],
  ["PICO MOUNTAIN", "Killington, VT", 1967, 61, 7, 129, 854, 1631, 909, 853, 2],
  ["POMERELLE", "Albion, ID", 1000, 24, 3, 130, 871, 1041, 1030, 445, 2],
  ["POWDERHORN", "Powderhorn, CO", 1650, 50, 4, 131, 867, 1193, 336, 335, 2],
  ["PURGATORY", "Silverton, CO", 2029, 105, 12, 132, 541, 1558, 949, 665, 4],
  ["RAGGED MOUNTAIN", "Hill, NH", 1250, 57, 6, 133, 1146, 1301, 1022, 361, 2],
  ["RED LODGE MOUNTAIN", "Red Lodge, MT", 2400, 70, 7, 134, 1576, 1457, 1060, 1187, 2],
  ["RED RIVER", "Red River, NM", 1600, 64, 7, 135, 1020, 1595, 736, 698, 2],
  ["ROUNDTOP", "Fortney, PA", 600, 19, 9, 136, 1067, 834, 858, 368, 1],
  ["SANDIA PEAK", "Sandia Park, NM", 1700, 35, 4, 137, 837, 1644, 475, 226, 1],
  ["SCHWEITZER", "Colburn, ID", 2400, 92, 10, 138, 896, 941, 858, 436, 2],
  ["SEVEN SPRINGS", "Seven Springs, PA", 750, 33, 14, 139, 2053, 964, 1609, 475, 2],
  ["SHAWNEE MOUNTAIN", "East Stroudsburg, PA", 700, 23, 9, 140, 767, 980, 720, 347, 1],
  ["SHOWDOWN", "Forest Green, MT", 1400, 36, 4, 141, 1420, 1256, 1590, 537, 2],
  ["SIERRA AT TAHOE", "Nebelhorn, CA", 2212, 47, 14, 142, 1314, 1138, 838, 565, 2],
  ["SILVER MOUNTAIN", "Kellogg, ID", 2200, 80, 7, 143, 1050, 1395, 699, 1087, 2],
  ["SIPAPU", "Tres Ritos, NM", 1055, 42, 6, 144, 726, 1212, 763, 641, 1],
  ["SKI APACHE", "Ruidoso, NM", 1900, 17, 11, 145, 986, 1639, 1551, 323, 2],
  ["SKI BIG BEAR", "Masthope, PA", 650, 18, 8, 146, 825, 1053, 1062, 375, 1],
  ["SKI BUTTERNUT", "Great Barrington, MA", 1000, 22, 10, 147, 1125, 927, 1032, 276, 1],
  ["SKI SANTA FE", "Tesuque, NM", 1725, 86, 7, 148, 1271, 1635, 1707, 901, 2],
  ["SKI SAWMILL", "Oregon Hill, PA", 515, 13, 5, 149, 553, 643, 739, 226, 1],
  ["SKI WARD", "Northborough, MA", 210, 9, 4, 150, 854, 715, 861, 210, 1],
  ["SLEEPING GIANT", "Cody, WY", 810, 48, 3, 151, 723, 1044, 590, 525, 1],
  ["SMUGGLERS NOTCH", "Cambridge, VT", 2610, 78, 8, 152, 996, 1238, 1048, 412, 2],
  ["SNOW SUMMIT", "Big Bear Lake, CA", 1200, 27, 16, 153, 1035, 1338, 1156, 210, 1],
  ["SNOW VALLEY", "Running Springs, CA", 1041, 32, 12, 154, 382, 1878, 719, 876, 1],
  ["SNOWBASIN", "Ogden, UT", 2900, 107, 12, 155, 2112, 1689, 2051, 559, 2],
  ["SNOWBIRD", "Alta, UT", 3240, 140, 14, 156, 1463, 2462, 1287, 1472, 2],
  ["SNOWSHOE MOUNTAIN", "Snowshoe, WV", 1500, 61, 12, 157, 2066, 172, 1278, 790, 2],
  ["SNOWY RANGE", "Centennial, WY", 990, 33, 5, 158, 1550, 850, 1651, 224, 2],
  ["SODA SPRINGS", "Soda Springs, CA", 652, 20, 6, 159, 701, 839, 761, 210, 1],
  ["SOLDIER MOUNTAIN", "Indian Head Rock, ID", 1400, 36, 3, 160, 649, 1243, 754, 638, 1],
  ["SOLITUDE", "Solitude, UT", 2494, 82, 9, 161, 969, 1479, 1178, 1140, 2],
  ["SPOUT SPRINGS", "Tollgate, OR", 610, 14, 4, 162, 416, 762, 660, 390, 1],
  ["SPRING MOUNTAIN", "Sprint Mt, PA", 450, 9, 6, 163, 455, 710, 658, 185, 1],
  ["SQUAW VALLEY", "Olympic Valley, CA", 2850, 245, 34, 164, 2459, 1798, 2714, 969, 4],
  ["STEAMBOAT", "Steamboat Springs, CO", 3668, 169, 18, 165, 2035, 2206, 1554, 1376, 4],
  ["STEVENS PASS", "Skykomish, WA", 1800, 53, 10, 166, 1310, 1244, 1879, 562, 2],
  ["STOWE", "Stowe, VT", 2360, 116, 12, 167, 1466, 1188, 1556, 153, 4],
  ["STRATTON", "Winhall, VT", 2003, 99, 11, 168, 578, 1327, 1046, 776, 2],
  ["SUGAR BOWL", "Truckee, CA", 1500, 105, 12, 169, 1456, 1249, 1690, 702, 2],
  ["SUGARBUSH", "Fayston, VT", 2600, 111, 16, 170, 656, 1315, 930, 958, 4],
  ["SUGARLOAF", "Carabassett Valley, ME", 2820, 162, 13, 171, 1884, 1879, 1815, 974, 4],
  ["SUICIDE SIX", "Pomfret, VT", 650, 24, 3, 172, 734, 897, 830, 405, 1],
  ["SUN VALLEY", "Ketchum, ID", 3400, 120, 18, 173, 1282, 1937, 1311, 1160, 4],
  ["SUNDANCE", "Sundance, UT", 2150, 45, 5, 174, 636, 2264, 1038, 1300, 2],
  ["SUNDAY RIVER", "Newry, ME", 2340, 135, 18, 175, 955, 1683, 1554, 1057, 2],
  ["SUNLIGHT MOUNTAIN", "Carbondale, CO", 2010, 72, 3, 176, 1212, 1528, 1413, 678, 2],
  ["SUNRISE PARK", "Greer, AZ", 1800, 69, 6, 177, 491, 1711, 927, 792, 2],
  ["TAHOE DONNER", "Truckee, CA", 600, 17, 4, 178, 628, 960, 974, 508, 1],
  ["TAMARACK", "Donnelly, ID", 2800, 48, 7, 179, 1497, 1737, 1813, 717, 4],
  ["TAOS", "Taos, NM", 3281, 110, 14, 180, 2003, 1702, 1657, 1157, 2],
  ["TELLURIDE", "Telluride, CO", 4425, 147, 17, 181, 582, 1220, 1164, 1630, 4],
  ["TENNEY MOUNTAIN", "Plymouth, NH", 1400, 48, 3, 182, 740, 1306, 1176, 167, 2],
  ["TERRY PEAK", "Terry, SD", 1100, 30, 5, 183, 821, 1194, 990, 375, 1],
  ["TETON PASS", "Choteau, MT", 1010, 43, 3, 184, 872, 1179, 831, 314, 1],
  ["THE SUMMIT AT SNOQUALMIE", "Easton, WA", 1025, 65, 20, 185, 1082, 1136, 1140, 592, 2],
  ["THUNDER RIDGE", "Patterson, NY", 500, 30, 6, 186, 923, 1103, 779, 274, 1],
  ["TIMBERLINE", "Government Camp, OR", 3690, 41, 8, 187, 824, 2136, 811, 1542, 2],
  ["TIMBERLINE MOUNTAIN", "Davis, WV", 1000, 22, 6, 188, 1141, 1104, 910, 283, 1],
  ["TITUS MOUNTAIN", "Malone, NY", 1200, 50, 10, 189, 1863, 1243, 1979, 615, 2],
  ["TUSSEY MOUNTAIN", "Boalsburg, PA", 520, 15, 5, 190, 710, 663, 786, 188, 1],
  ["VAIL", "Vail, CO", 3450, 195, 31, 191, 1748, 833, 1465, 201, 4],
  ["WACHUSETT", "Princeton, MA", 1000, 27, 8, 192, 1079, 983, 1118, 239, 1],
  ["WATERVILLE VALLEY", "Waterville Valley, NH", 2020, 62, 12, 193, 1090, 1401, 1502, 506, 2],
  ["WEST MOUNTAIN", "Queensbury, NY", 1010, 29, 5, 194, 567, 1159, 893, 327, 1],
  ["WHITE PASS", "Naches Valley, WA", 2050, 45, 8, 195, 1283, 1505, 1600, 831, 2],
  ["WHITE PINE", "Pinedale, WY", 1100, 25, 2, 196, 1244, 1177, 789, 240, 1],
  ["WHITEFACE", "Wilmington, NY", 3430, 89, 12, 197, 567, 1663, 1224, 435, 4],
  ["WHITEFISH", "Whitefish, MT", 2353, 113, 14, 198, 916, 1549, 1738, 881, 2],
  ["WHITETAIL", "Kasiesville, PA", 935, 22, 8, 199, 1015, 1075, 1371, 316, 1],
  ["WILDCAT MOUNTAIN", "Jackson, NH", 2112, 48, 5, 200, 1206, 1503, 1125, 229, 2],
  ["WILLAMETTE PASS", "Cascade Summit, OR", 1563, 29, 5, 201, 985, 1960, 1417, 1301, 2],
  ["WINDHAM MOUNTAIN", "Windham, NY", 1600, 54, 11, 202, 1096, 1004, 1471, 243, 2],
  ["WINTER PARK", "Winter Park, CO", 3060, 121, 25, 203, 2091, 2304, 1883, 1666, 4],
  ["WINTERPLACE", "Ghent, WV", 603, 27, 9, 204, 1357, 970, 1324, 712, 1],
  ["WISP", "McHenry, MD", 700, 33, 12, 205, 540, 1288, 855, 722, 1],
  ["WOLF CREEK", "Creed Consolidated 1, CO", 1604, 133, 10, 206, 2342, 1230, 2492, 548, 4]
];

var trails = [
  ["ODYSSEY", 66, 3, [1597, 574, 1586, 581, 1596, 648, 1572, 639, 1471, 965, 1459, 958, 1440, 1044, 1428, 1033, 1418, 1069, 1411, 1052]],
  ["KARYATIS WAY", 66, 1, [1527, 522, 1531, 508, 1482, 500, 1486, 491, 1419, 484, 1420, 467, 1371, 482, 1354, 474, 1435, 627, 1414, 628, 1416, 696, 1406, 696, 1387, 746, 1382, 728, 1331, 771, 1330, 760, 1278, 827, 1267, 827, 1289, 910, 1286, 918, 1356, 960, 1350, 971, 1396, 1051, 1373, 1048]],
  ["ARCADIAN GATE", 66, 2, [909, 434, 904, 424, 840, 477, 831, 462, 597, 546, 596, 528, 370, 687, 365, 667, 223, 835, 201, 835]],
  ["SUPERSTAR", 84, 3, [1713, 947, 1732, 926, 1764, 1004, 1784, 984, 1804, 1053, 1818, 1039, 1900, 1154, 1912, 1141, 2015, 1234, 2035, 1190]],
  ["CASCADE", 84, 4, [2008, 382, 1996, 383, 2020, 463, 1996, 464, 2029, 532, 2007, 535, 2035, 664, 2018, 668, 2065, 735, 2055, 767, 2109, 774, 2110, 798, 2136, 819, 2120, 816, 2120, 958, 2106, 956, 2099, 1178, 2074, 1194]],
  ["MILKY WAY", 31, 1, [931, 317, 935, 302, 623, 378, 615, 368, 482, 737, 467, 739, 473, 809, 458, 807, 476, 880, 465, 887, 806, 1158, 802, 1175, 1086, 1307, 1065, 1305]],
  ["MORNING STAR", 31, 2, [912, 341, 931, 361, 732, 528, 749, 550, 495, 763, 527, 778]],
  ["SOUTHERN CROSS", 31, 2, [1098, 472, 1092, 463, 1051, 639, 1041, 620, 844, 734, 823, 753, 992, 975, 972, 978, 978, 1031, 972, 1016, 802, 1157, 802, 1172, 1086, 1300, 1063, 1302]],
  ["COMET", 31, 4, [1091, 467, 1097, 471, 1080, 639, 1097, 633, 1104, 996, 1131, 990, 1133, 1109, 1171, 1113, 1132, 1314, 1170, 1321]],
  ["ROCKET", 31, 3, [1252, 452, 1273, 456, 1239, 569, 1261, 571, 1193, 963, 1219, 968, 1155, 1312, 1178, 1312]],
  ["GALAXY", 31, 3, [1393, 415, 1390, 401, 1372, 437, 1384, 431, 1362, 630, 1395, 631, 1326, 1040, 1343, 1037, 1313, 1170, 1337, 1169, 1325, 1297, 1345, 1303]],
  ["NORTH STAR", 31, 2, [1374, 444, 1391, 438, 1415, 515, 1422, 509, 1524, 646, 1549, 649, 1491, 939, 1507, 942, 1355, 1284, 1364, 1298]]
];

var races = [
  ["JACOPIE", 87, [662, 495, 697, 545, 744, 624, 797, 705, 830, 751, 879, 818, 947, 919, 989, 986, 1021, 1041]],
  ["BADGER", 87, [1165, 254, 1172, 306, 1179, 365, 1184, 429, 1189, 487, 1195, 541, 1200, 634, 1201, 695, 1196, 761, 1190, 846, 1191, 954, 1191, 1038]],
  ["PTARMIGAN", 87, [534, 474, 537, 535, 546, 594, 551, 655, 559, 714, 568, 778, 570, 837, 582, 908, 580, 969, 573, 1021, 582, 1066, 584, 1088]],
  ["ODYSSEY", 66,  [1595, 631, 1559, 733, 1524, 855, 1509, 888, 1472, 941, 1442, 1004]],
  ["CRISTY'S RUN", 66, [1382, 751, 1360, 785, 1339, 821, 1329, 856, 1323, 880, 1319, 904, 1319, 934]],
  ["BIG BLUE", 19, [851, 225, 829, 258, 807, 289, 779, 330, 753, 365, 735, 394, 707, 423, 684, 474, 650, 551, 627, 599, 614, 617]],
];


//var zooms = [1, 2, 1, 1, 1, 2, 1, 1, 1, 4, 2, 1, 2, 2, 4, 1, 2, 2, 1, 2];
var zooms = [];
for (var i = 0 ; i < stats.length ; i++) {
  zooms.push(stats[i][10]);
}

//zooms = [1, 2, 2, 2, 1, 2, 2, 4];

var stopped = false;
var trailInd = -1;
var raceInd = -1;
var first = true;

function runProgram(num, trailInd, raceInd) {
  var starting = 0;
  if (raceInd != -1) {
    if (first) {
      starting = 21;
      first = false;
    }
    else {
      starting = 6;
    }
  }
  var success = false;
  var cpval = 100;
  var countdown = 0;
  var cpnum = -1;
  var ch = [];
  var on = [];
  var onr = [];
  if (trailInd != -1 ){
    for (var i = 0 ; i < trails[trailInd][3].length / 4 ; i++) {
      ch.push(false);
      on.push(false);
    }
  }
  if (raceInd != -1) {
    for (var i = 0 ; i < races[raceInd][2].length / 2 ; i++) {
      onr.push(false);
    }
  }

  var mpx1 = stats[num][6];
  var mpy1 = stats[num][7];
  var mpx2 = stats[num][8];
  var mpy2 = stats[num][9];

  running = true;

  console.log("Running...");

  var targs = [];
  for (var i = 0 ; i < stats.length ; i++) {
    targs.push(stats[i][0]);
  }
  //var targs = ["AFTON ALPS", "ALTA", "ALYESKA", "ANGEL FIRE", "ANTHONY LAKES", "ARAPAHOE BASIN", "ARIZONA SNOWBOWL"];
  //var targs = ["BRISTOL MOUNTAIN", "GORE MOUNTAIN", "SONG MOUNTAIN", "TOGGENBURG", "GREEK PEAK", "KILLINGTON", "ELK MOUNTAIN", "LABRADOR MOUNTAIN", "HOLIDAY VALLEY", "BIG SKY", "OKEMO", "SNOW RIDGE", "WHITEFACE MOUNTAIN", "SUGARLOAF", "REVELSTOKE", "WOODS VALLEY", "SMUGGLERS NOTCH", "HEAVENLY", "SWAIN", "HUNTER MOUNTAIN"];
  //var targs = ["SONG MOUNTAIN", "TOGGENBURG", "GREEK PEAK", "LABRADOR MOUNTAIN"];

  var TARGET = targs[num];


  var TOWERS = 10;
  var CABLES = 10;

  var ELFA = 1240;

  var GRIDSCALE = 24;

  GRIDSCALE *= Math.max(1, zooms[num]);

  var imgArr = [];

  var movables = [];

  var grid = [];
  var elev = [];
  var rotx = 0;
  var roty = 0;
  var rotz = 0;

  var CHUNK = 120;
  var STEEPCHUNK = 80;
  var stand = 24.3;
  if (num == 66 || num == 31) {
    stand = 480;
    CHUNK = 360;
  }
  stand /= Math.max(1, zooms[num]);


  function swap(grid) {
    var ngrid = [];
    for (var i = 0 ; i < grid[0].length ; i++) {
      ngrid.push([]);
      for (var j = 0 ; j < grid.length ; j++) {
        ngrid[ngrid.length - 1].push(grid[j][i]);
      }
    }
    return ngrid;
  }

  var signs = [];
  var sloms = [];
  var lifts = [];
  var banners = [];



  function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function() {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
          var allText = rawFile.responseText;

          allText = allText.split("\n");

          var ind = 0;


          var line = allText[1].split(" ");
          var n = parseInt(line[0]);
          var m = parseInt(line[1]);




          for (var i = 0 ; i < n ; i++) {
            elev.push([]);
            for (var j = 0 ; j < m ; j++) {
              elev[i].push(-1);
            }
          }

          for (var i = 0 ; i < n ; i++) {
            var line = allText[i + 2].split(" ");
            for (var j = 0 ; j < m ; j++) {

              elev[i][j] = parseFloat(line[j]);

            }
          }

          elev = swap(elev);

        }
      }
    }
    rawFile.send(null);
  }


  function readTextFile2(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function() {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
          var allText = rawFile.responseText;
          allText = allText.split("\n");


          var ind = 0;

          for (var i = 0 ; i < allText.length ; i++) {
            if (allText[i].length < 5) {
              ind = i;
              break;
            }
            grid.push([]);
            allText[i] = allText[i].split("");
            for (var j = 0 ; j < allText[i].length ; j++) {
              grid[grid.length - 1].push(allText[i][j]);
            }
          }
          grid = swap(grid);

          var len = parseInt(allText[ind]);


          ind++;

          for (var i = 0 ; i < len ; i++) {
            var line = allText[ind].split(" ");

            var name = line[1];
            var x1 = parseInt(line[2]);
            var y1 = parseInt(line[3]);
            var x2 = parseInt(line[4]);
            var y2 = parseInt(line[5]);
            signs.push([name, x1, y1, x2, y2, parseInt(line[0])]);
            ind++;
          }

          len = parseInt(allText[ind]);

          ind++;

          for (var i = 0 ; i < len ; i++) {
            var line = allText[ind].split(" ");
            ind++;
            var num = parseInt(line[0]);
            var x1 = parseInt(line[1]);
            var y1 = parseInt(line[2]);
            var x2 = parseInt(line[3]);
            var y2 = parseInt(line[4]);
            lifts.push([num, x1, y1, x2, y2]);
          }
        }
      }
    }
    rawFile.send(null);
  }

  readTextFile("pixels/m" + (num+1) + "c.txt");
  readTextFile2("pixels/m" + (num+1) + "f.txt");

  var onec = 0;
  for (var i = 0 ; i < grid.length ; i++) {
    for (var j = 0 ; j < grid.length ; j++) {
      if (grid[i][j] != "0" && grid[i][j] != 0) {
        onec++;
      }
    }
  }

  function findPixel(x, y) {
    return grid[x][y];
  }

  console.log("Done loading files.");

  //ans = [];

  var upd = 5;

  function translate(startX, startY) {
    var mpx4 = lifts[0][1];
    var mpy4 = lifts[0][2];
    var mpx5 = lifts[0][3];
    var mpy5 = lifts[0][4];
    var mpx3 = startX;
    var mpy3 = startY;

    var miniAngle1 = Math.atan((mpy5 - mpy4) / (mpx5 - mpx4 + 0.000001));
    if (mpx5 < mpx4) {
      miniAngle1 += Math.PI;
    }

    var mpd1 = Math.sqrt((mpx5-mpx4)*(mpx5-mpx4) + (mpy5-mpy4)*(mpy5-mpy4));
    var mpd2 = Math.sqrt((mpx2-mpx1)*(mpx2-mpx1) + (mpy2-mpy1)*(mpy2-mpy1));
    var mpd3 = Math.sqrt((mpx3-mpx1)*(mpx3-mpx1) + (mpy3-mpy1)*(mpy3-mpy1));

    var miniAngle2 = Math.atan((mpy3 - mpy1) / (mpx3 - mpx1 + 0.000001));
    if (mpx3 < mpx1) {
      miniAngle1 += Math.PI;
    }

    var miniAngle3 = Math.atan((mpy2 - mpy1) / (mpx2 - mpx1 + 0.000001));
    if (mpx2 < mpx1) {
      miniAngle3 += Math.PI;
    }

    var miniAngle4 = miniAngle1 + miniAngle2 - miniAngle3;

    var mpx6 = mpx4 + Math.cos(miniAngle4) * mpd3 * (mpd1 / mpd2);
    var mpy6 = mpy4 + Math.sin(miniAngle4) * mpd3 * (mpd1 / mpd2);

    return [mpx6, mpy6];
  }

  if (trailInd != -1) {
    var post = trails[trailInd][3];
    for (var i = 0 ; i < post.length ; i += 4) {
      var x1 = post[i];
      var y1 = post[i+1];
      var x2 = post[i+2];
      var y2 = post[i+3];

      var pt1 = translate(x1, y1);
      var pt2 = translate(x2, y2);

      banners.push([trails[trailInd][0], pt1[0], pt1[1], pt2[0], pt2[1], 1]);

    }
  }



  var px = 100;
  var pz = 100;

  var roty = 0;
  var frm = 0;

  var iST = -76.1;
  var jST = 42.485;
  var iINC = 0.2;
  var jINC = 0.1;

  var SF = 9;

  var lookx = 0;
  var looky = 0;

  var keys = [];
  for (var i = 0 ; i < 500 ; i++) {
    keys[i] = false;
  }

  document.addEventListener("keydown", function(event) {
    keys[event.keyCode] = true;
  });

  document.addEventListener("keyup", function(event) {
    keys[event.keyCode] = false;
  });

  function main() {

    var DV = 13;
    var LIM = DV * 50;
    var XF = 12;

    function getElevation(x, y) {

      var leftI = parseInt(x/CHUNK) * CHUNK;
      var rightI = parseInt(x/CHUNK) * CHUNK  + CHUNK;
      var leftJ = parseInt(y/CHUNK) * CHUNK;
      var rightJ = parseInt(y/CHUNK) * CHUNK + CHUNK;


      var x0, y0, x1, y1, x2, y2;

      if (y - leftJ < x - leftI) {
        x0 = leftI;
        y0 = leftJ;
        x1 = rightI;
        y1 = leftJ;
        x2 = rightI;
        y2 = rightJ;
      }
      else {
        x0 = leftI;
        y0 = leftJ;
        x1 = leftI;
        y1 = rightJ;
        x2 = rightI;
        y2 = rightJ;
      }

      if (x0 == NaN) {
        return 0;
      }

      if (x0 < 0 || x0 > elev.length) {
        return -1;
      }
      if (x1 < 0 || x1 > elev.length) {
        return -1;
      }
      if (x2 < 0 || x2 > elev.length) {
        return -1;
      }

      if (y0 < 0 || y0 > elev[x0].length) {
        return -1;
      }
      if (y1 < 0 || y1 > elev[x1].length) {
        return -1;
      }
      if (y2 < 0 || y2 > elev[x2].length) {
        return -1;
      }


      var z0 = elev[x0][y0];
      var z1 = elev[x1][y1];
      var z2 = elev[x2][y2];

      var vec1 = [x1 - x0, y1 - y0, z1 - z0];
      var vec2 = [x2 - x0, y2 - y0, z2 - z0];
      var cros = [vec1[1] * vec2[2] - vec1[2] * vec2[1], vec1[2] * vec2[0] - vec1[0] * vec2[2], vec1[0] * vec2[1] - vec1[1] * vec2[0]];
      var mx = cros[0];
      var my = cros[1];
      var mz = cros[2];
      var z = (mz * z0 + my * y0 + mx * x0 - mx * x - my * y) / mz;

      //mx(x - x0) + my(y - y0) + mz(z - z0) = 0
      //mx * x - mx * x0 + my * y - my * y0 + mz * z - mz * z0 = 0
      //mz * z = mz * z0 + my * y0 + mx * x0 - mx * x - mx * y
      //z = (mz * z0 + my * y0 + mx * x0 - mx * x - mx * y) / mz

      var leftAns = (elev[leftI][leftJ] * (1 - x % 1) + elev[rightI][leftJ] * (x % 1)) / DV;
      var rightAns = (elev[leftI][rightJ] * (1 - x % 1) + elev[rightI][rightJ] * (x % 1)) / DV;
      var ans = (leftAns * (1 - y % 1) + rightAns * (y % 1)) / DV;

      return z / (DV*DV);

      //return z / DV;
    }


    //const canvas = document.querySelector("#can");
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('rgb(230, 255, 255)');

    /*const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array( [
      10000, 6000, -10000,
      20000, 6000, -10000,
      -10000, 6000, -20000,
      10000, 6000, -20000,
      20000, 6000, -20000,
      20000, 6000, -10000
    ] );
    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    const material2 = new THREE.MeshBasicMaterial( { color: '0x000000' } );
    const mesh2 = new THREE.Mesh( geometry, material2 );
    scene.add(mesh2);*/

    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 80000);
    //camera.position.set(0, 0, 48);
    //camera.lookAt(0, 0, 0);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight - 150);
    document.getElementById("three").appendChild(renderer.domElement);


    var SLALOM = 600;

    var rpos = [];
    if (raceInd != -1) {


      for (var i = 0 ; i < races[raceInd][2].length ; i += 2) {
        var rp = translate(races[raceInd][2][i], races[raceInd][2][i+1]);
        rpos.push([rp[0]*GRIDSCALE, -(grid[0].length-rp[1])*GRIDSCALE]);
      }

      var totDist = 0;

      for (var i = 0 ; i < rpos.length - 1 ; i++) {
        totDist += Math.sqrt((rpos[i+1][0]-rpos[i][0])*(rpos[i+1][0]-rpos[i][0]) + (rpos[i+1][1]-rpos[i][1])*(rpos[i+1][1]-rpos[i][1]));
      }


      var segs = 1;
      while (totDist / segs > SLALOM) {
        segs++;
      }

      var sd = totDist / segs;

      var i = 0;
      var x = rpos[0][0];
      var y = rpos[0][1];
      var lx = -1;
      var ly = -1;
      var along = 0;
      var left = 1;

      var SIDE = 4.5 / zooms[num];

      for (var j = 0 ; j < segs-1 ; j++) {
        lx = x;
        ly = y;
        while (left > 0) {
          if (Math.sqrt((rpos[i+1][0]-x)*(rpos[i+1][0]-x) + (rpos[i+1][1]-y)*(rpos[i+1][1]-y)) >= sd*left) {
            x += (rpos[i+1][0]-rpos[i][0]) * ((left * sd) / Math.sqrt((rpos[i+1][0]-rpos[i][0])*(rpos[i+1][0]-rpos[i][0]) + (rpos[i+1][1]-rpos[i][1])*(rpos[i+1][1]-rpos[i][1])));
            y += (rpos[i+1][1]-rpos[i][1]) * ((left * sd) / Math.sqrt((rpos[i+1][0]-rpos[i][0])*(rpos[i+1][0]-rpos[i][0]) + (rpos[i+1][1]-rpos[i][1])*(rpos[i+1][1]-rpos[i][1])));
            left = 0;
          }
          else {
            left -= Math.sqrt((rpos[i+1][0]-x)*(rpos[i+1][0]-x) + (rpos[i+1][1]-y)*(rpos[i+1][1]-y)) / sd;
            x = rpos[i+1][0];
            y = rpos[i+1][1];
            i++;
          }
        }
        var el1 = getElevation(lx/GRIDSCALE, grid[0].length + ly/GRIDSCALE)*ELFA*(XF/2.3);
        var el2 = getElevation(x/GRIDSCALE, grid[0].length + y/GRIDSCALE)*ELFA*(XF/2.3);

        var atval = Math.atan((el1 - el2)/ (Math.sqrt((rpos[i+1][0]-rpos[i][0])*(rpos[i+1][0]-rpos[i][0])+(rpos[i+1][1]-rpos[i][1])*(rpos[i+1][1]-rpos[i][1]))));


        var ang = Math.atan((rpos[i+1][1]-rpos[i][1])/(rpos[i+1][0]-rpos[i][0]));
        if (rpos[i][0] < rpos[i+1][0]) {
          ang += Math.PI;
        }
        ang += Math.PI/2;

        if (j < segs-2) {
          SIDE = Math.min(4.5/zooms[num], (4.5/zooms[num])*(atval / 0.05));
          //SIDE = 4.5 / zooms[num];
        }
        else {
          SIDE = 375 / GRIDSCALE;
        }

          sloms.push([x + Math.cos(ang) * SIDE * GRIDSCALE, y + Math.sin(ang) * SIDE * GRIDSCALE, x - Math.cos(ang) * SIDE * GRIDSCALE, y - Math.sin(ang) * SIDE * GRIDSCALE, 2]);

        left = 1;

      }
    }



    var camx = lifts[0][3] * GRIDSCALE;
    var camy = -(grid[0].length - lifts[0][4]) * GRIDSCALE;

    var ppt = translate(startX, startY);



    camx = ppt[0] * GRIDSCALE;
    camy = -(grid[0].length - ppt[1]) * GRIDSCALE;

    if (raceInd != -1) {
      camx = (sloms[0][0] + sloms[0][2])/2;
      camy = (sloms[0][1] + sloms[0][3])/2;
    }

    /*var controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 2, 0);
    controls.update();
    camera.position.set(0, 200, 0);
    controls.update();*/

    //imageList = ["beach", "forest", "skimountain", "ecstasy", "glass", "stpeter", "love", "nature", "mountains", "meat", "flower", "flirtation", "girl", "building", "skyscraper", "tinycity", "diagram1", "dome", "ocean", "eco", "plant", "darkbeach", "diagram2"];

    var cubes = [];

    var fc = 0;
    var x = 0;
    var y = 0;

    var geometries = [];
    var geometries2 = [];
    var steepgeo = [];
    for (var i = 0 ; i < 20 ; i++) {
      steepgeo.push([]);
    }

    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array( [
      0, 6000, 0,
      50000, 6000, 0,
      50000, 6000, -50000,

      50000, 6000, -50000,
      0, 6000, -50000,
      0, 6000, 0,

      50000, 6000, -50000,
      50000, 6000, 0,
      0, 6000, 0,

      0, 6000, 0,
      0, 6000, -50000,
      50000, 6000, -50000
    ] );

    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

    //steepgeo[17].push(geometry);
    var loader = new THREE.TextureLoader();


    var letgeo = [];
    for (var i = 0 ; i < 5 ; i++) {
      letgeo.push([]);
      for (var j = 0 ; j < 27 ; j++) {
        letgeo[i].push([]);
      }
    }

    for (var j = 0 ; j < signs.length ; j++) {

      var STRING = signs[j][0];

      var cx = (signs[j][1] + signs[j][3]) / 2;
      var cy = (signs[j][2] + signs[j][4]) / 2;

      var ROT = Math.atan((signs[j][4] - signs[j][2]) / (signs[j][3] - signs[j][1]));
      if (signs[j][1] < signs[j][3]) {
        ROT += Math.PI;
      }
      var ang = Math.atan((signs[j][4] - signs[j][2]) / (signs[j][3] - signs[j][1])) + Math.PI/2;
      if (signs[j][3] > signs[j][1]) {
        ang += Math.PI;
      }


      var SI = 20;

      var lx = cx - ((STRING.length/2)*SI/GRIDSCALE)*Math.cos(ROT);
      var ly = cy - ((STRING.length/2)*SI/GRIDSCALE)*Math.sin(ROT);


      var yy = getElevation(parseInt(cx),parseInt(cy))*ELFA*(XF/2.3);

      if (yy == cx) {

      }

      var geometries4 = [];
      for (var i = 0 ; i < STRING.length ; i++) {
        var geometry4 = new THREE2.BoxGeometry(SI, SI, 1);

        geometry4.rotateY(-ROT);
        geometry4.translate(lx*GRIDSCALE, yy + 40, -(grid[0].length - ly)*GRIDSCALE);

        if (STRING[i] == "_") {
          letgeo[signs[j][5]][26].push(geometry4);
        }
        else {
          letgeo[signs[j][5]][STRING.charCodeAt(i) - 65].push(geometry4);
        }
        lx += Math.cos(ROT)*SI/GRIDSCALE;
        ly += Math.sin(ROT)*SI/GRIDSCALE;

      }

      lx = cx - ((STRING.length/2)*SI/GRIDSCALE)*Math.cos(ROT) + Math.cos(ang + Math.PI)*1/GRIDSCALE;
      ly = cy - ((STRING.length/2)*SI/GRIDSCALE)*Math.sin(ROT) + Math.sin(ang + Math.PI) * 1/GRIDSCALE;

      for (var i = 0 ; i < STRING.length ; i++) {
        var geometry4 = new THREE2.BoxGeometry(SI, SI, 1);

        geometry4.rotateY(-ROT);
        geometry4.translate((lx)*GRIDSCALE, yy + 40, -(grid[0].length - (ly))*GRIDSCALE);

        if (STRING[STRING.length-i-1] == "_") {
          letgeo[signs[j][5]][26].push(geometry4);
        }
        else {
          letgeo[signs[j][5]][STRING.charCodeAt(STRING.length-i-1) - 65].push(geometry4);
        }

        lx += Math.cos(ROT)*SI/GRIDSCALE;
        ly += Math.sin(ROT)*SI/GRIDSCALE;


      }
    }

    var bangeo = [];
    var slomgeo = [[], [], []];
    var banpos = [];

    if (raceInd != -1) {
      for (var j = 0 ; j < sloms.length ; j++) {
        var cx = sloms[j][0];
        var cy = sloms[j][1];
        if (j%2 == 1) {
          cx = sloms[j][2];
          cy = sloms[j][3];
        }
        if (j == sloms.length - 1) {
          cx = (sloms[j][0]+sloms[j][2])/2;
          cy = (sloms[j][1]+sloms[j][3])/2;
        }
        else if (j == 0 || j == sloms.length-1) {
          cx = (sloms[j][0] + sloms[j][2])/2;
          cy = (sloms[j][1] + sloms[j][3])/2;
        }

        var ROT = Math.atan((sloms[j][3] - sloms[j][1]) / (sloms[j][2] - sloms[j][0]));
        if (sloms[j][0] < sloms[j][2]) {
          ROT += Math.PI;
        }
        var ang = Math.atan((sloms[j][3] - sloms[j][1]) / (sloms[j][2] - sloms[j][0])) + Math.PI/2;
        if (sloms[j][2] > sloms[j][0]) {
          ang += Math.PI;
        }

        var STRING = "A";

        var SI = 20;


        var yy = getElevation(parseInt(cx/GRIDSCALE),parseInt((grid[0].length + cy/GRIDSCALE)))*ELFA*(XF/2.3);

        if (yy == cx) {

        }

        var sw = 50;
        var sw2 = 750;
        var h = 40;
        var high = 30;
        var h2 = 150;

        if (j > 0 && j < sloms.length-1) {
            var geometry4 = new THREE2.BoxGeometry(sw, 12, 1);

            geometry4.rotateY(-ROT);
            geometry4.translate(cx, yy + h, cy);

            slomgeo[j%2].push(geometry4);



          var geomet = new THREE2.BoxGeometry(2, (1000 + h + high)*2, 1);
          geomet.rotateY(-ROT);
          geomet.translate(cx - sw/2 * Math.cos(ROT), yy - 1000, cy - sw/2 * Math.sin(ROT));
          slomgeo[j%2].push(geomet);

          var geomet2 = new THREE2.BoxGeometry(2, (1000 + h + high)*2, 1);
          geomet2.rotateY(-ROT);
          geomet2.translate(cx + sw/2 * Math.cos(ROT), yy - 1000, cy + sw/2 * Math.sin(ROT));
          slomgeo[j%2].push(geomet2);
        }
        else {
          var geometry4 = new THREE2.BoxGeometry(sw2, 20, 1);

          geometry4.rotateY(-ROT);
          geometry4.translate(cx, yy + h2, cy);

          slomgeo[2].push(geometry4);



        var geomet = new THREE2.BoxGeometry(10, (1000 + h2 + high)*2, 1);
        geomet.rotateY(-ROT);
        geomet.translate(cx - sw2/2 * Math.cos(ROT), yy - 1000, cy - sw2/2 * Math.sin(ROT));
        slomgeo[2].push(geomet);

        var geomet2 = new THREE2.BoxGeometry(10, (1000 + h2 + high)*2, 1);
        geomet2.rotateY(-ROT);
        geomet2.translate(cx + sw2/2 * Math.cos(ROT), yy - 1000, cy + sw2/2 * Math.sin(ROT));
        slomgeo[2].push(geomet2);
        }
      }
    }




    var smaterial1 = new THREE2.MeshBasicMaterial({color:'rgb(0, 0, 200)', opacity:0.8, transparent: true});
    //material5 = new THREE2.MeshBasicMaterial({color:0xffffff, map: loader.load("bristol.png"), transparent: true,opacity: 0.4});

    if (slomgeo[0].length) {
      var smergedGeometry1 = BufferGeometryUtils.mergeBufferGeometries(slomgeo[0], false);
      var smesh1 = new THREE2.Mesh(smergedGeometry1, smaterial1);

      scene.add(smesh1);
    }

    var smaterial2 = new THREE2.MeshBasicMaterial({color:'rgb(200, 0, 0)', opacity:0.8, transparent: true});
    //material5 = new THREE2.MeshBasicMaterial({color:0xffffff, map: loader.load("bristol.png"), transparent: true,opacity: 0.4});

    if (slomgeo[1].length) {
      var smergedGeometry2 = BufferGeometryUtils.mergeBufferGeometries(slomgeo[1], false);
      var smesh2 = new THREE2.Mesh(smergedGeometry2, smaterial2);

      scene.add(smesh2);
    }

    var smaterial3 = new THREE2.MeshBasicMaterial({color:'rgb(0, 0, 0)', opacity:0.8, transparent: true});
    //material5 = new THREE2.MeshBasicMaterial({color:0xffffff, map: loader.load("bristol.png"), transparent: true,opacity: 0.4});


    if (slomgeo[2].length) {
      var smergedGeometry3 = BufferGeometryUtils.mergeBufferGeometries(slomgeo[2], false);
      var smesh3 = new THREE2.Mesh(smergedGeometry3, smaterial3);

      scene.add(smesh3);
    }

    for (var j = 0 ; j < banners.length ; j++) {


      var cx = (banners[j][1] + banners[j][3]) / 2;
      var cy = (banners[j][2] + banners[j][4]) / 2;
      var ROT = Math.atan((banners[j][4] - banners[j][2]) / (banners[j][3] - banners[j][1]));
      if (banners[j][1] < banners[j][3]) {
        ROT += Math.PI;
      }
      var ang = Math.atan((banners[j][4] - banners[j][2]) / (banners[j][3] - banners[j][1])) + Math.PI/2;
      if (banners[j][3] > banners[j][1]) {
        ang += Math.PI;
      }

      var STRING = "A";

      var SI = 20;

      var lx = cx - ((STRING.length/2)*SI/GRIDSCALE)*Math.cos(ROT);
      var ly = cy - ((STRING.length/2)*SI/GRIDSCALE)*Math.sin(ROT);
      var dist = Math.sqrt((banners[j][3]-banners[j][1])*(banners[j][3]-banners[j][1])+(banners[j][4]-banners[j][2])*(banners[j][4]-banners[j][2]));

      var yy = getElevation(parseInt(cx),parseInt(cy))*ELFA*(XF/2.3);

      if (yy == cx) {

      }

      var sw = dist*GRIDSCALE + 30;

      if (j > 0) {
        for (var i = 0 ; i < STRING.length ; i++) {
          var geometry4 = new THREE2.BoxGeometry(sw, 40, 1);

          geometry4.rotateY(-ROT);
          geometry4.translate(cx*GRIDSCALE, yy + 200, -(grid[0].length - cy)*GRIDSCALE);

          bangeo.push(geometry4);

          lx += Math.cos(ROT)*SI/GRIDSCALE;
          ly += Math.sin(ROT)*SI/GRIDSCALE;

        }

        var geomet = new THREE2.BoxGeometry(10, 2440, 1);
        geomet.rotateY(-ROT);
        geomet.translate(cx*GRIDSCALE - sw/2 * Math.cos(ROT), yy - 1000, -(grid[0].length - cy)*GRIDSCALE - sw/2 * Math.sin(ROT));
        bangeo.push(geomet);

        var geomet2 = new THREE2.BoxGeometry(10, 2440, 1);
        geomet2.rotateY(-ROT);
        geomet2.translate(cx*GRIDSCALE + sw/2 * Math.cos(ROT), yy - 1000, -(grid[0].length - cy)*GRIDSCALE + sw/2 * Math.sin(ROT));
        bangeo.push(geomet2);
      }

      banpos.push(cx*GRIDSCALE - sw/2 * Math.cos(ROT));
      banpos.push(-(grid[0].length - cy)*GRIDSCALE - sw/2 * Math.sin(ROT));
      banpos.push(cx*GRIDSCALE + sw/2 * Math.cos(ROT));
      banpos.push(-(grid[0].length - cy)*GRIDSCALE + sw/2 * Math.sin(ROT));

      var geomet3 = new THREE2.BoxGeometry(10, 10000, 1);
      geomet3.rotateY(-ROT);
      geomet3.translate((cx)*GRIDSCALE, yy - 420, -(grid[0].length - (cy))*GRIDSCALE);
      //bangeo.push(geomet3);

    }

    var material53 = new THREE2.MeshBasicMaterial({color:'rgb(0, 200, 40)', opacity:0.4, transparent: true});
    //material5 = new THREE2.MeshBasicMaterial({color:0xffffff, map: loader.load("bristol.png"), transparent: true,opacity: 0.4});

    if (bangeo.length) {
      var mergedGeometry43 = BufferGeometryUtils.mergeBufferGeometries(bangeo, false);
      var mesh43 = new THREE2.Mesh(mergedGeometry43, material53);

      scene.add(mesh43);
    }



    var chars = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',' '];

    //var material = new THREE.MeshBasicMaterial({ color: 0x00ffaa});
    for (var j = 0 ; j < letgeo.length ; j++) {
      for (var i = 0 ; i < letgeo[j].length ; i++) {
        if (letgeo[j][i].length == 0) continue;

        //material.alphaMap = arr;
        var loader = new THREE.TextureLoader();

        /*var material4 = [];
        for (var i = 0 ; i < 6 ; i++) {
          var ind = parseInt(Math.random()*24) + 1;
          material4.push(new THREE.MeshBasicMaterial({
            map: loader.load("letters/" + chars[i] + ".png"),
            color: 0x00dd00,
            transparent: true,
            opacity: 0.4
          }));
        }*/
        var material5;

        material5 = new THREE2.MeshBasicMaterial({color:0xffffff, map: loader.load("letters/" + chars[i] + (6-Math.min(3,j)) + ".png"), transparent: false});
        //material5 = new THREE2.MeshBasicMaterial({color:0xffffff, map: loader.load("bristol.png"), transparent: true,opacity: 0.4});

        var mergedGeometry4 = BufferGeometryUtils.mergeBufferGeometries(letgeo[j][i], false);
        var mesh4 = new THREE2.Mesh(mergedGeometry4, material5);

        scene.add(mesh4);
      }
    }

    var liftgeo = [];
    var seatgeo = [];

    var positions = [];

    var chairliftPos = [];
    var totalPositions = [];
    var dsts = [];
    var totalAngles = [];
    var goald = [];

    var WDT = 80;

    for (var i = 0 ; i < lifts.length ; i++) {

      chairliftPos.push([]);

      var HTT = 80;
      var OH = 80;
      var MH = 220;
      var HINC = 8;

      WDT = 80 + (lifts[i][0] - 2) * 10;



      var ang = Math.atan((lifts[i][4]-lifts[i][2])/(lifts[i][3]-lifts[i][1]));
      if (lifts[i][3] < lifts[i][1]) {
        ang += Math.PI;
      }

      var x = lifts[i][1];
      var y = lifts[i][2];

      var circle = new THREE2.CircleGeometry(WDT/2, 32);
      circle.rotateX(3*Math.PI/2);
      circle.translate(x*GRIDSCALE, getElevation(x, y) * ELFA * (XF / 2.3) + OH + 3, -(grid[0].length-y)*GRIDSCALE);
      liftgeo.push(circle);

      circle = new THREE2.CircleGeometry(WDT/2, 32);
      circle.rotateX(Math.PI/2);
      circle.translate(x*GRIDSCALE, getElevation(x, y) * ELFA * (XF / 2.3) + OH + 3, -(grid[0].length-y)*GRIDSCALE);
      liftgeo.push(circle);

      circle = new THREE2.CircleGeometry(WDT/2, 32);
      circle.rotateX(3*Math.PI/2);
      circle.translate(x*GRIDSCALE, getElevation(x, y) * ELFA * (XF / 2.3) + OH - 3, -(grid[0].length-y)*GRIDSCALE);
      liftgeo.push(circle);

      circle = new THREE2.CircleGeometry(WDT/2, 32);
      circle.rotateX(Math.PI/2);
      circle.translate(x*GRIDSCALE, getElevation(x, y) * ELFA * (XF / 2.3) + OH - 3, -(grid[0].length-y)*GRIDSCALE);
      liftgeo.push(circle);

      x = lifts[i][3];
      y = lifts[i][4];
      var circle = new THREE2.CircleGeometry(WDT/2, 32);
      circle.rotateX(3*Math.PI/2);
      circle.translate(x*GRIDSCALE, getElevation(x, y) * ELFA * (XF / 2.3) + OH + 3, -(grid[0].length-y)*GRIDSCALE);
      liftgeo.push(circle);

      circle = new THREE2.CircleGeometry(WDT/2, 32);
      circle.rotateX(Math.PI/2);
      circle.translate(x*GRIDSCALE, getElevation(x, y) * ELFA * (XF / 2.3) + OH + 3, -(grid[0].length-y)*GRIDSCALE);
      liftgeo.push(circle);

      circle = new THREE2.CircleGeometry(WDT/2, 32);
      circle.rotateX(3*Math.PI/2);
      circle.translate(x*GRIDSCALE, getElevation(x, y) * ELFA * (XF / 2.3) + OH - 3, -(grid[0].length-y)*GRIDSCALE);
      liftgeo.push(circle);

      circle = new THREE2.CircleGeometry(WDT/2, 32);
      circle.rotateX(Math.PI/2);
      circle.translate(x*GRIDSCALE, getElevation(x, y) * ELFA * (XF / 2.3) + OH - 3, -(grid[0].length-y)*GRIDSCALE);
      liftgeo.push(circle);

      x = lifts[i][1];
      y = lifts[i][2];

      var bottomWheel = [];
      var SEGS = 50;

      for (var j = ang + Math.PI -Math.PI/2 + Math.PI/SEGS ; j < ang + Math.PI + Math.PI/2 - Math.PI/SEGS ; j += Math.PI/SEGS) {

        var ccx = x + (WDT/(2*GRIDSCALE))*Math.cos(j);
        var ccy = y + (WDT/(2*GRIDSCALE))*Math.sin(j);

        var ccz = getElevation(ccx,ccy)*ELFA*(XF/2.3) + OH;

        bottomWheel.push([ccx*GRIDSCALE, -(grid[0].length-ccy)*GRIDSCALE, ccz]);

      }

      x = lifts[i][3];
      y = lifts[i][4];

      var topWheel = [];

      for (var j = ang + Math.PI + Math.PI/2 + Math.PI/SEGS ; j < ang + Math.PI + 3 * Math.PI/2 - Math.PI/SEGS ; j += Math.PI/SEGS) {
        //const geometry16 = new THREE2.CylinderGeometry(0.6, 0.6, 300, 4);


        var ccx = x + (WDT/(2*GRIDSCALE))*Math.cos(j);
        var ccy = y + (WDT/(2*GRIDSCALE))*Math.sin(j);

        var ccz = getElevation(ccx,ccy)*ELFA*(XF/2.3) + OH;

        topWheel.push([ccx*GRIDSCALE, -(grid[0].length-ccy)*GRIDSCALE, ccz]);

        //ccx = x;
        //ccy = y;

        //geometry16.translate(ccx*GRIDSCALE, getElevation(ccx,ccy)*ELFA*(XF/2.3) + OH + 150, -(grid[0].length-ccy)*GRIDSCALE);

        //topWheelo.push(geometry16);
      }

      x = lifts[i][1];
      y = lifts[i][2];

      var liftNum = lifts[i][0];

      var leftPositions = [];
      var rightPositions = [];

      for (var j = 0 ; j < TOWERS+2 ; j++) {



        var diffx = ((lifts[i][3]-lifts[i][1])/(TOWERS+2)) / CABLES;
        var diffy = ((lifts[i][4]-lifts[i][2])/(TOWERS+2)) / CABLES;

        var nx = x;
        var ny = y;

        nx = nx - WDT/(GRIDSCALE*2) * Math.cos(ang + Math.PI/2);
        ny = ny - WDT/(GRIDSCALE*2) * Math.sin(ang + Math.PI / 2);

        var OOH = HTT;

        for (var k = 0 ; k < CABLES ; k++) {


          var NX = HTT;
          if (NX < MH && k > 0 && j < TOWERS/2) {
            NX += HINC;
            NX = Math.min(NX, MH);
          }
          if (((TOWERS+1 - j) * CABLES + (CABLES - k)) * HINC <= MH - OH + HINC) {
            NX -= HINC;
            NX = Math.max(NX, OH);
          }

          var x1 = nx;
          var y1 = ny;

          var z1 = getElevation(x1,y1)*ELFA*(XF/2.3) + HTT;
          leftPositions.push([x1*GRIDSCALE, -(grid[0].length-y1)*GRIDSCALE, z1]);
          var x2 = nx + diffx;
          var y2 = ny + diffy;

          var z2 = getElevation(x2,y2)*ELFA*(XF/2.3) + NX;

          HTT = NX;

          if (k%2==0) {
          }





          var dist = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2)) * GRIDSCALE;
          var dist2 = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) + (z1/GRIDSCALE-z2/GRIDSCALE)*(z1/GRIDSCALE-z2/GRIDSCALE)) * GRIDSCALE;

          var theta = Math.atan((y2-y1)/(x2-x1));
          if (x2 > x1) {
            theta += Math.PI;
          }

          var phi = Math.atan((z2-z1)/(dist));


          const geometry8 = new THREE2.CylinderGeometry(0.3, 0.3, dist2, 4);

          geometry8.rotateZ(-phi + Math.PI/2);
          geometry8.rotateY(-theta);

          geometry8.translate(((x1+x2)/2)*GRIDSCALE,    (z1+z2)/2 , -(grid[0].length-(y1+y2)/2)*GRIDSCALE);

          liftgeo.push(geometry8);

          nx += diffx;
          ny += diffy;
        }

        nx = x;
        ny = y;

        nx = nx + WDT/(GRIDSCALE*2) * Math.cos(ang + Math.PI/2);
        ny = ny + WDT/(GRIDSCALE*2) * Math.sin(ang + Math.PI / 2);

        HTT = OOH;

        for (var k = 0 ; k < CABLES ; k++) {

          var NX = HTT;
          if (HTT < MH && k > 0 && j < TOWERS/2) {
            NX += HINC;
            NX = Math.min(NX, MH);
          }
          if (((TOWERS+1 - j) * CABLES + (CABLES - k)) * HINC <= MH - OH + HINC) {
            NX -= HINC;
            NX = Math.max(NX, OH);
          }

          var x1 = nx;
          var y1 = ny;

          var z1 = getElevation(x1,y1)*ELFA*(XF/2.3) + HTT;
          rightPositions.push([x1*GRIDSCALE, -(grid[0].length-y1)*GRIDSCALE, z1]);

          var x2 = nx + diffx;
          var y2 = ny + diffy;
          var z2 = getElevation(x2,y2)*ELFA*(XF/2.3) + NX;

          HTT = NX;

          if (k%2==0) {

          }



          var dist = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2)) * GRIDSCALE;
          var dist2 = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) + (z1/GRIDSCALE-z2/GRIDSCALE)*(z1/GRIDSCALE-z2/GRIDSCALE)) * GRIDSCALE;

          var theta = Math.atan((y2-y1)/(x2-x1));
          if (x2 > x1) {
            theta += Math.PI;
          }

          var phi = Math.atan((z2-z1)/(dist));

          const geometry8 = new THREE2.CylinderGeometry(0.3, 0.3, dist2, 4);

            geometry8.rotateZ(-phi + Math.PI/2);
            geometry8.rotateY(-theta);

            geometry8.translate(((x1+x2)/2)*GRIDSCALE,    (z1+z2)/2 , -(grid[0].length-(y1+y2)/2)*GRIDSCALE);

            liftgeo.push(geometry8);


          nx += diffx;
          ny += diffy;
        }

        var OOOH = HTT;
        HTT = OOH;

        var NX = HTT;
        if (HTT < MH && j < TOWERS/2) {
          NX += HINC;
          NX = Math.min(NX, MH);
        }
        if (((TOWERS+1 - j) * CABLES + (CABLES - k)) * HINC <= MH - OH + HINC) {
          NX -= HINC;
          NX = Math.max(NX, OH);
        }

        if (j > 0) {
          const geometry6 = new THREE2.CylinderGeometry(3.7, 3.7, HTT, 8);

          geometry6.translate(x*GRIDSCALE,     getElevation(x,y)*ELFA*(XF/2.3) + HTT / 2, -(grid[0].length-y)*GRIDSCALE);

          liftgeo.push(geometry6);

          var x1 = x - Math.cos(ang+Math.PI/2)*(WDT/(2*GRIDSCALE));
          //x1 = nx;
          var y1 = y - Math.sin(ang+Math.PI/2)*(WDT/(2*GRIDSCALE));

          //y1 = ny;
          var z1 = getElevation(x1,y1)*ELFA*(XF/2.3) + HTT;
          var x2 = x + Math.cos(ang+Math.PI/2)*(WDT/(2*GRIDSCALE));
          //x2 = nx + 100;
          var y2 = y + Math.sin(ang+Math.PI/2)*(WDT/(2*GRIDSCALE));
          //y2 = ny + 100;

          var z2 = getElevation(x2,y2)*ELFA*(XF/2.3) + HTT;


          var theta = Math.atan((y2-y1)/(x2-x1));
          if (y2 < y1) {
            theta += Math.PI;
          }

          var phi = Math.atan((z2-z1)/(dist));

          const geometry7 = new THREE2.CylinderGeometry(0.8, 0.8, WDT, 8);


          geometry7.rotateZ(phi + Math.PI/2);
          geometry7.rotateY(-theta);

          geometry7.translate(((x1+x2)/2)*GRIDSCALE,    (z1+z2)/2 , -(grid[0].length-(y1+y2)/2)*GRIDSCALE);
          //geometry7.translate((x1+x2)/2)*GRIDSCALE, getElevation(x1,y1)*ELFA*(XF/2.3) + HTT, -(grid[0].length-y1)*GRIDSCALE);

          liftgeo.push(geometry7);
        }

        HTT = OOOH;

        x += (lifts[i][3] - lifts[i][1]) / (TOWERS+2);
        y += (lifts[i][4] - lifts[i][2]) / (TOWERS+2);
      }

      totalPositions.push([]);

      for (var j = 0 ; j < bottomWheel.length ; j++) {
        totalPositions[totalPositions.length-1].push(bottomWheel[j]);
      }

      for (var j = 0 ; j < leftPositions.length ; j++) {
        totalPositions[totalPositions.length-1].push(leftPositions[j]);
      }

      for (var j = 0 ; j < topWheel.length ; j++) {
        totalPositions[totalPositions.length-1].push(topWheel[j]);
      }

      for (var j = rightPositions.length - 1 ; j >= 0 ; j--) {
        totalPositions[totalPositions.length-1].push(rightPositions[j]);
      }

      //totalAngles.push([]);

      var totalDist = 0;
      dsts.push([]);
      totalAngles.push([]);

      for (var j = 0 ; j < totalPositions[totalPositions.length-1].length ; j++) {
        var x1 = totalPositions[totalPositions.length-1][j][0];
        var y1 = totalPositions[totalPositions.length-1][j][1];
        var z1 = totalPositions[totalPositions.length-1][j][2];
        var x2 = totalPositions[totalPositions.length-1][(j+1)%totalPositions[totalPositions.length-1].length][0];
        var y2 = totalPositions[totalPositions.length-1][(j+1)%totalPositions[totalPositions.length-1].length][1];
        var z2 = totalPositions[totalPositions.length-1][(j+1)%totalPositions[totalPositions.length-1].length][2];

        totalDist += Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) + (z1-z2)*(z1-z2));
        dsts[dsts.length - 1].push(Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) + (z1-z2)*(z1-z2)));

        var angle = Math.atan((y2-y1)/(x2-x1));

        if (x2 > x1) {
          angle += Math.PI;
        }


        totalAngles[totalAngles.length - 1].push(-angle);
      }

      var chairliftCars = 20;

      var gone = 0;

      var ind = 0;

      var goal = 0;


      goald.push(totalDist / chairliftCars);

      var totC = 0;

      for (var k = 0 ; k < totalDist ; k += totalDist / chairliftCars) {
        totC++;

        goal += totalDist / chairliftCars;

        while (goal >= dsts[dsts.length-1][ind]) {
          goal -= dsts[dsts.length-1][ind];
          ind = (ind + 1) % dsts[dsts.length-1].length;
        }

        var posX = totalPositions[totalPositions.length-1][ind][0] + (totalPositions[totalPositions.length-1][(ind+1)%totalPositions[totalPositions.length-1].length][0] - totalPositions[totalPositions.length-1][ind][0]) * (goal / dsts[totalPositions.length-1][ind]);
        var posY = totalPositions[totalPositions.length-1][ind][1] + (totalPositions[totalPositions.length-1][(ind+1)%totalPositions[totalPositions.length-1].length][1] - totalPositions[totalPositions.length-1][ind][1]) * (goal / dsts[totalPositions.length-1][ind]);
        var posZ = totalPositions[totalPositions.length-1][ind][2] + (totalPositions[totalPositions.length-1][(ind+1)%totalPositions[totalPositions.length-1].length][2] - totalPositions[totalPositions.length-1][ind][2]) * (goal / dsts[totalPositions.length-1][ind]);

        //posX = totalPositions[47][0];
        //posY = totalPositions[47][1];
        //posZ = totalPositions[47][2];

        var cargeo = [];

        const geometry9 = new THREE2.CylinderGeometry(0.6, 0.6, 26, 4);
        geometry9.translate(posX, posZ-13, posY);
        cargeo.push(geometry9);

        const geometry10 = new THREE2.CylinderGeometry(0.6, 0.6, 15*liftNum, 4);
        geometry10.rotateX(Math.PI/2);
        geometry10.translate(posX, posZ-26, posY);
        cargeo.push(geometry10);
        const geometry11 = new THREE2.CylinderGeometry(0.6, 0.6, 15*liftNum, 4);
        geometry11.rotateX(Math.PI/2);
        geometry11.translate(posX, posZ-66, posY);
        cargeo.push(geometry11);
        const geometry12 = new THREE2.CylinderGeometry(0.6, 0.6, 40, 4);
        //geometry12.translate(posX - 7.5*liftNum*Math.sin(ang), posZ-46, posY - 7.5*liftNum*Math.cos(ang));
        geometry12.translate(posX, posZ-46, posY - 7.5*liftNum);
        cargeo.push(geometry12);
        const geometry13 = new THREE2.CylinderGeometry(0.6, 0.6, 40, 4);
        //geometry13.translate(posX + 7.5*liftNum*Math.sin(ang), posZ-46, posY + 7.5*liftNum*Math.cos(ang));
        geometry13.translate(posX, posZ-46, posY + 7.5*liftNum);
        cargeo.push(geometry13);

        var geometry14 = new THREE2.BoxGeometry(20, 2, 15*liftNum + 6);
        //geometry14.rotateY(-ang);
        geometry14.translate(posX - 10, posZ-66, posY);
        cargeo.push(geometry14);

        var geometry15 = new THREE2.BoxGeometry(10, 2, 15*liftNum + 6);
        geometry15.rotateZ(Math.PI/3);
        //geometry15.rotateY(-ang);
        geometry15.translate(posX + 5, posZ-56, posY);
        cargeo.push(geometry15);


        const mergedGeometry9 = BufferGeometryUtils.mergeBufferGeometries(cargeo, false);

        var material9 = new THREE2.MeshBasicMaterial({color:'rgb(30, 30, 30)'});
        if (totC <= 1) {
          //var material9 = new THREE2.MeshBasicMaterial({color:'rgb(200, 30, 30)'});
        }
        const mesh9 = new THREE2.Mesh(mergedGeometry9, material9);

        chairliftPos[chairliftPos.length - 1].push([mergedGeometry9, posX, posY, posZ, ind, goal, 0]);

        scene.add(mesh9);


      }



    }

    if (liftgeo.length) {
      const mergedGeometry6 = BufferGeometryUtils.mergeBufferGeometries(liftgeo, false);
      const material6 = new THREE2.MeshBasicMaterial({color:'rgb(30, 30, 30)'});
      const mesh6 = new THREE2.Mesh(mergedGeometry6, material6);

      scene.add(mesh6);
    }

    /*const mergedGeometry7 = BufferGeometryUtils.mergeBufferGeometries(seatgeo, false);
    const material7 = new THREE2.MeshBasicMaterial({color:'rgb(30, 30, 30)'});
    const mesh7 = new THREE2.Mesh(mergedGeometry7, material7);
    scene.add(mesh7);*/



    //materials = new THREE.MeshFaceMaterial(materials);

    //var material = new THREE.MeshBasicMaterial({map: loader.load("flower.jpg")});

    //var cube = new THREE.Mesh(geometry4, material4);

    /*cube.scale.x = 100;
    cube.scale.y = 100;
    cube.scale.z = 10;
    cube.position.x = 2000;
    cube.position.y = 7000;
    cube.position.z = -2000;*/

    //scene.add(cube);



    var cols = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

    var geometries2 = [];

    function makeTriangle(v1, v2, v3, col) {

      /*var geometry = new THREE.Geometry();
      var triangle = new THREE.Triangle(v1, v2, v3);
      var normal = triangle.getNormal();
      geometry.vertices.push(triangle.a);
      geometry.vertices.push(triangle.b);
      geometry.vertices.push(triangle.c);
      geometry.faces.push(new THREE.Face3(0, 1, 2, normal));*/
      var col = 'rgb(240, 240, 240)';
      //var col = 'rgb(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random()*255) + ',' + parseInt(Math.random()*255) + ')';

      var x0 = v1.x;
       var x1 = v2.x;
       var x2 = v3.x;
       var y0 = -v1.z;
       var y1 = -v2.z;
       var y2 = -v3.z;

      var z0 = v1.y;
      var z1 = v2.y;
      var z2 = v3.y;

      var vec1 = [x1 - x0, y1 - y0, z1 - z0];
      var vec2 = [x2 - x0, y2 - y0, z2 - z0];

      var cros = [vec1[1] * vec2[2] - vec1[2] * vec2[1], vec1[2] * vec2[0] - vec1[0] * vec2[2], vec1[0] * vec2[1] - vec1[1] * vec2[0]];

      var mx = cros[0];
      var my = cros[1];
      var mz = cros[2];
      var steep = Math.sqrt(mx * mx + my * my) / mz;



      var r = parseInt(-steep*(255/1.3));
      var tier = Math.min(19, parseInt(r / 12.5));


      //var col = 'rgb(' + parseInt(-steep*(255/1.5)) + "," + parseInt((1.5+steep)*(255/1.5)) + ',0)';

      /*const material = new THREE.MeshBasicMaterial({color: col});
      material.side = THREE.DoubleSide;
      var mesh = new THREE.Mesh(geometry, material);
      //geometries2.push(geometry);
      scene.add(mesh);*/

      const geometry = new THREE.BufferGeometry();
      // create a simple square shape. We duplicate the top left and bottom right
      // vertices because each vertex needs to appear once per triangle.
      const vertices = new Float32Array( [
      	v1.x, v1.y,  v1.z,
      	 v2.x, v2.y,  v2.z,
      	 v3.x,  v3.y,  v3.z,

         v3.x, v3.y, v3.z,
         v2.x, v2.y, v2.z,
         v1.x, v1.y, v1.z
      ] );

      geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
      //const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
      //const mesh = new THREE.Mesh( geometry, material );
      steepgeo[tier].push(geometry);

      /*geometries2.push(geometry);*/
    }


    //geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

    class Cylinder {
      constructor(x, y, z) {
        const HT = Math.random()*40 + 220;
        const geometry = new THREE2.CylinderGeometry(9.6, 9.6, HT, 3);
        /*const material = new THREE2.MeshBasicMaterial({color: 'rgb(0, 125, 0)'});
        const cylinder = new THREE2.Mesh(geometry, material);
        cylinder.rotation.x = 0.5*Math.PI;*/
        geometry.translate(x, z + HT/2, -y);
        geometries.push(geometry);
        /*for (var i = 0 ; i < 0 ; i++) {
          const geometry17 = new THREE2.CylinderGeometry(0.3, 0.3, 50, 3);
          geometry17.rotateZ(Math.PI/2);
          geometry17.translate(x + 25, z+i*10, -y);
          geometries.push(geometry17);
        }*/

        /*const geometry17 = new THREE2.ConeGeometry(20, 100, 10);
        geometry17.translate(x, z + HT - 50, -y);
        geometries.push(geometry17);*/
        //scene.add(cylinder);
      }
    }

    class Cube {


      constructor(pts, cl) {
        var vs = [];
        for (var i = 0 ; i < pts.length ; i++) {
          vs.push(new THREE.Vector3(pts[i][0], pts[i][1], pts[i][2]));
        }

        var col = '#';
        for (var i = 0 ; i < 6 ; i++) {
          col += cols[parseInt(Math.random()*16)];
        }

        var col2 = '#';
        for (var i = 0 ; i < 6 ; i++) {
          col2 += cols[parseInt(Math.random()*16)];
        }

        col = cl;

        makeTriangle(vs[0], vs[1], vs[2], col);

        makeTriangle(vs[2], vs[3], vs[0], col);

        //makeTriangle(vs[0], vs[3], vs[2]);

      }



      update() {

      }
    }
    //camera.lookAt(0, 0, 0);

    var ti = 0.003;
    var t = 0;

    /*var grid = [
    ];
    for (var i = 0 ; i < 50 ; i++) {
      grid.push([]);
      for (var j = 0 ; j < 50 ; j++) {
        var val = Math.sin(i * (Math.PI / 12.5)) * 20;
        var val2 = Math.sin(j * (Math.PI / 12.5)) * 20;
        val += val2;
        var r = (val + 40) * (255 / 80);
        var g = 255 - r;
        grid[i].push(val);
      }
    }*/



    var FC = 0.5;
    var elINC = 100 / (3.28084 * SF);

    var cols2 = ['rgba(255, 0, 0', 'rgba(255, 125, 0', 'rgba(200, 200, 0', 'rgba(100, 200, 0', 'rgba(0, 255, 0', 'rgba(0, 255, 125', 'rgba(0, 255, 255', 'rgba(0, 125, 255', 'rgba(0, 0, 255', 'rgba(125, 0, 255', 'rgba(255, 0, 255', 'rgba(255, 0, 125'];

    /*for (var i = 0 ; i < elev.length-1 ; i++) {
      for (var j = 0 ; j < elev[i].length-1 ; j++) {
        var y1 = i;
        var y2 = (i+1);
        var x1 = j;
        var x2 = (j+1);
        var z1 = grid[i][j];
        var z2 = grid[i+1][j];
        var z3 = grid[i+1][j+1];
        var z4 = grid[i][j+1];
        var el = grid[i][j];
        var cl = cols2[parseInt(el / elINC) % cols2.length];
        cl += ', 0.1)';
        cl = 0xffffff;
        cubes.push(new Cube([[y1*XF / 2, z1*XF / 2.3, -x1*XF / 2], [y2*XF / 2, z2*XF / 2.3, -x1*XF / 2], [y2*XF / 2, z3*XF / 2.3, -x2*XF / 2], [y1*XF / 2, z4*XF / 2.3, -x2*XF / 2]], cl));
      }
    }*/

    for (var i = 0 ; i < grid.length  - CHUNK*2; i+=CHUNK) {
      for (var j = 0 ; j < grid[i].length - CHUNK*2; j+=CHUNK) {

        var y1 = j;
        var y2 = (j+CHUNK);
        var x1 = i;
        var x2 = (i+CHUNK);


        /*y1 = Math.random() * (grid[0].length - CHUNK*5);
        y2 = y1 + CHUNK;
        x1 = Math.random() * (grid.length - CHUNK*5);
        x2 = x1 + CHUNK;*/

        if (j < 0 || i >= grid.length || i < 0 || j >= grid[i].length) {
          continue;
        }

        var z1 = getElevation(x1, y1)*ELFA;
        var z2 = getElevation(x1+CHUNK, y1)*ELFA;
        var z3 = getElevation(x1+CHUNK, y1+CHUNK)*ELFA;
        var z4 = getElevation(x1, y1+CHUNK)*ELFA;

        y1 = grid[0].length - y1 - 1;
        y2 = grid[0].length - y2 - 1;

        //if (z1 >= 6000 || z2 >= 6000 || z3 >= 6000 || z4 >= 6000) continue;

        var el = elev[i][j];

        if (i == CHUNK * 24 && j == CHUNK * 24) {

        }
        var cl = cols2[parseInt(el / elINC) % cols2.length];
        //cl += ', 0.1)';
        //cl = 0xffffff;
        /*x1 /= FC;
        x2 /= FC;
        y1 /= FC;
        y2 /= FC;*/
        //cubes.push(new Cube([[y1*XF / 2, z1*XF / 2.3, -x1*XF / 2], [y2*XF / 2, z2*XF / 2.3, -x1*XF / 2], [y2*XF / 2, z3*XF / 2.3, -x2*XF / 2], [y1*XF / 2, z4*XF / 2.3, -x2*XF / 2]], cl));
        //if (i == CHUNK * 24 && j == CHUNK * 24) {
        cubes.push(new Cube([[x1 * GRIDSCALE, (z1*XF / 2.3), -y1 * GRIDSCALE], [x2 * GRIDSCALE, (z2*XF / 2.3), -y1 * GRIDSCALE], [x2 * GRIDSCALE, (z3*XF / 2.3), -y2 * GRIDSCALE], [x1 * GRIDSCALE, (z4*XF / 2.3), -y2 * GRIDSCALE]], cl));
        //}


      }
    }







    const lonHelper = new THREE2.Object3D();
    scene.add(lonHelper);
    // We rotate the latHelper on its X axis to the latitude
    const latHelper = new THREE2.Object3D();
    lonHelper.add(latHelper);
    // The position helper moves the object to the edge of the sphere
    const positionHelper = new THREE2.Object3D();
    positionHelper.position.z = 1;
    latHelper.add(positionHelper);

    const originHelper = new THREE2.Object3D();
    originHelper.position.z = 0.5;
    positionHelper.add(originHelper);

    const lonFudge = Math.PI * .5;
    const latFudge = Math.PI * -0.135;

    var xval = 20;
    var yval = 20;

    var CHAOS = 0.1;

    var i = 0;

    var tottrees = 0;

    var trees = [];
    for (var i = 0 ; i < grid.length ; i++ ){
      trees.push([]);
      for (var j = 0 ; j < grid[0].length ; j++) {
        trees[i].push([]);
      }
    }

    var TREEF = 20;

    while (xval < grid.length) {
      yval = 20;
      var j = 0;
      while (yval < grid[0].length) {
        yval += stand;

        var rfx = Math.random() * (stand * (2/3)) - (stand / 3);
        var rfy = Math.random() * (stand * (2/3)) - (stand / 3);

        xval += rfx;
        yval += rfy;

        if (yval >= grid[0].length) {
          xval -= rfy;
          break;
        }


        var x = parseInt(xval);
        var y = parseInt(yval);


        if (x < 0 || x >= grid.length - CHUNK * 2 || y < 0 || y >= grid[0].length - CHUNK * 2) {
          xval -= rfx;
          yval -= rfy;
          continue;
        }
        //var pd = findPixel(x, y);

        //grid[x][y] = 1;

        for (var k = 0 ; k < lifts.length ; k++) {
          var m1 = (lifts[k][4] - lifts[k][2]) / (lifts[k][3] - lifts[k][1]);
          var b1 = lifts[k][4] - lifts[k][3] * m1;
          var m2 = -1 / m1;
          var b2 = yval - m2 * xval;
          var ix = (b2 - b1) / (m1 - m2);
          var iy = m1 * ix + b1;
          var dst = Math.sqrt((xval-ix)*(xval-ix) + (yval-iy)*(yval-iy));
          if (dst <= 170/GRIDSCALE && xval >= Math.min(lifts[k][1], lifts[k][3]) - 170/GRIDSCALE && xval <= Math.max(lifts[k][1], lifts[k][3]) + 170/GRIDSCALE && yval >= Math.min(lifts[k][2], lifts[k][4]) - 170/GRIDSCALE && yval <= Math.max(lifts[k][2], lifts[k][4]) + 170/GRIDSCALE) {
            grid[x][y] = 0;
          }

        }

        if (grid[x][y] == 0) {
          j++;
          xval -= rfx;
          yval -= rfy;
          continue;
        }

        var ans = getElevation(xval, yval) * ELFA;
        if (ans == NaN || ans == Infinity) {
          //break;
        }



        trees[parseInt(xval/TREEF)][parseInt((grid[0].length - yval - 1)/TREEF)].push([xval * GRIDSCALE, -(grid[0].length - yval - 1) * GRIDSCALE]);

        var c = new Cylinder(xval * GRIDSCALE, (grid[0].length - yval - 1) * GRIDSCALE, ans * XF / 2.3);
        tottrees++;

        xval -= rfx;
        yval -= rfy;

        j++;
      }

      xval += stand * (1 + Math.random() * CHAOS);
      i++;
    }

    const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(geometries, false);
    const material = new THREE2.MeshBasicMaterial({color:'rgb(140,70,0)'});
    const mesh = new THREE2.Mesh(mergedGeometry, material);
    scene.add(mesh);

    for (var i = 0 ; i < 20 ; i++) {
      if (steepgeo[i].length) {
        const mergedGeometry2 = BufferGeometryUtils.mergeBufferGeometries(steepgeo[i], false);
        //const material2 = new THREE2.MeshBasicMaterial({color:'rgb(' + parseInt(i*12.5) + ',' + parseInt(255 - i*12.5) + ',0)'});
        const material2 = new THREE2.MeshBasicMaterial({color:'rgb(255, 255, 255)'});
        const mesh2 = new THREE2.Mesh(mergedGeometry2, material2);
        scene.add(mesh2);
      }
    }

    /*
    const mergedGeometry2 = BufferGeometryUtils.mergeBufferGeometries(geometries2, false);
    const material2 = new THREE2.MeshBasicMaterial({color:'rgb(255,255,255)'});
    const mesh2 = new THREE2.Mesh(mergedGeometry2, material2);
    scene.add(mesh2);*/

    var TURNFRICTION = 1.02;
    var FLATFRICTION = 1.002;
    var ACCEL = 0.35;
    var POLE = 6;
    var TURN = 0.15;
    var FPFAC = 27;

    var friction = 1;
    var playerSpeed = 0;

    var ridingLift = false;
    var liftChosen = 0;
    var choice = 0;
    var maxElev = 0;
    var maxX = 0;
    var maxY = 0;

    var godmode = false;
    var possible = false;

    var tickt = 0;
    var treecrash = 0;

    var mouseY = window.innerHeight / 2;
    var MFA = 0;
    var frm =0 ;

    var ocamx = -1;
    var ocamy = -1;

    if (trailInd != -1) {
      for (var i = 0 ; i < banpos.length ; i += 4) {
        var x1 = banpos[i];
        var y1 = banpos[i+1];
        var x2 = banpos[i+2];
        var y2 = banpos[i+3];

        var m = (y2 - y1) / (x2 - x1);
        var b = y1 - m * x1;

        var dy = camx * m + b;


        if (camy >= dy) {
          on[i/4] = true;
        }
        else if (camy < dy) {
          on[i/4] = false;
        }
      }

    }

    if (trailInd != -1) {
      for (var i = 0 ; i < banpos.length ; i += 4) {
        var x1 = banpos[i];
        var y1 = banpos[i+1];
        var x2 = banpos[i+2];
        var y2 = banpos[i+3];

        var m = (y2 - y1) / (x2 - x1);
        var b = y1 - m * x1;

        var dy = camx * m + b;


        if (camy >= dy) {
          on[i/4] = true;
        }
        else if (camy < dy) {
          on[i/4] = false;
        }
      }

    }

    if (raceInd != -1) {
      for (var i = 0 ; i < sloms.length ; i ++) {
        var x1 = sloms[i][0];
        var y1 = sloms[i][1];
        var x2 = sloms[i][2];
        var y2 = sloms[i][3];

        var m = (y2 - y1) / (x2 - x1);
        var b = y1 - m * x1;

        var dy = camx * m + b;


        if (camy >= dy) {
          onr[i] = true;
        }
        else if (camy < dy) {
          onr[i] = false;
        }
      }

    }

    var lastCall = -1;
    var fps = 0;
    var frav = [];

    var time = -starting;
    var finalTime = 0;
    var pentime = 0;
    var move = 0;
    var pressed2 = false;
    var oa = -1;
    var difft = 0;
    var alpha = 0;
    var beta = 0;
    var gamma = 0;

    window.addEventListener("deviceorientation", function(e) {
      if (oa != -1) {
        difft = e.alpha - oa;
      }
      alpha = e.alpha;
      beta = e.beta;
      gamma = e.gamma;
      oa = e.alpha;
    });

    var clicked = false;

    var elem = document.getElementById("three");

    elem.addEventListener("touchstart", e => {
      //console.log("clicked");
      clicked = true;
      //lockPointer(elem);
    });

    elem.addEventListener("touchend", e => {
      //console.log("unclicked");
      clicked = false;
      //lockPointer(elem);
    });

    var elem4 = document.getElementById("click");
    var left = elem.offsetLeft + elem4.clientLeft;
    var etop = elem.offsetTop + elem4.clientTop;
    var mountSel = 2;

    var turningLeft = false;
    var turningRight = false;
    var poling = false;

    elem4.addEventListener('mousedown', function(event) {
      var x = event.pageX - left;
      var y = event.pageY - etop;

      if (y >= window.innerHeight - 100) {
        if (x <= window.innerWidth / 3) {
          turningLeft = true;
        }
        else if (x >= window.innerWidth * 2 / 3){
          turningRight = true;
        }
        else {
          poling = true;
        }
      }
    });

    elem4.addEventListener('mouseup', function(event) {
      turningLeft = false;
      turningRight = false;
      poling = false;
    });


    elem4.addEventListener('touchstart', function(event) {
      var x = event.pageX - left;
      var y = event.pageY - etop;

      if (y >= window.innerHeight - 100) {
        if (x <= window.innerWidth / 3) {
          turningLeft = true;
        }
        else if (x >= window.innerWidth * 2 / 3){
          turningRight = true;
        }
        else {
          poling = true;
        }
      }
    });

    elem4.addEventListener('touchend', function(event) {
      turningLeft = false;
      turningRight = false;
      poling = false;
    });

    function animate() {
      document.getElementById("click").height = 100;
      document.getElementById("click").width = window.innerWidth;
      var g = document.getElementById("click").getContext('2d');
      g.font = '24px Avenir';
      g.fillStyle = 'rgb(0, 0, 0)';
      g.fillText("Turn Left", 140, 70);
      g.fillText("Use Poles", window.innerWidth*0.46, 70);

      g.fillText("Turn Right", window.innerWidth - 340, 70);
      //if (window.DeviceOrientationEvent) {

      //document.getElementById("support").innerHTML = "supported";

      if (lastCall != -1) {
        var diff = (Date.now() - lastCall) / 1000;
        time += diff;
        starting -= diff;
        fps = 1/diff;
      }
      lastCall = Date.now();


      if (frav.length >= 10) {
        for (var i = 0 ; i <= 8 ; i++) {
          frav[i] = frav[i+1];
        }
        frav[9] = fps;
      }
      else {
        frav.push(fps);
      }

      var avg = 0;
      for (var i=0 ; i < frav.length ; i++) {
        avg += frav[i];
      }

      avg = avg / frav.length;
      if (avg == 0) {
        avg = 60;
      }

      renderer.render(scene, camera);

      move = 1.6 * (FPFAC / avg);
      //move = 0;


      if (keys[81] && ridingLift) {
        move = 72 * (FPFAC / avg);
        //move = 72;
      }

      if (keys[81] && !pressed2) {
        pressed2 = true;
      }
      else if (pressed2 && !keys[81]) {
        pressed2 = false;
      }

      for (var i = 0 ; i < chairliftPos.length ; i++) {
        for (var j = 0 ; j < chairliftPos[i].length ; j++) {

          chairliftPos[i][j][5] += move;

          while (chairliftPos[i][j][5] >= dsts[i][chairliftPos[i][j][4]]) {
            chairliftPos[i][j][5] -= dsts[i][chairliftPos[i][j][4]];
            chairliftPos[i][j][4] = (chairliftPos[i][j][4]+1)%dsts[i].length;
          }

          var ox = chairliftPos[i][j][1];
          var oy = chairliftPos[i][j][2];
          var oz = chairliftPos[i][j][3];

          chairliftPos[i][j][1] = totalPositions[i][chairliftPos[i][j][4]][0] + (totalPositions[i][(chairliftPos[i][j][4]+1)%dsts[i].length][0] - totalPositions[i][chairliftPos[i][j][4]][0]) * (chairliftPos[i][j][5] / dsts[i][chairliftPos[i][j][4]]);
          chairliftPos[i][j][2] = totalPositions[i][chairliftPos[i][j][4]][1] + (totalPositions[i][(chairliftPos[i][j][4]+1)%dsts[i].length][1] - totalPositions[i][chairliftPos[i][j][4]][1]) * (chairliftPos[i][j][5] / dsts[i][chairliftPos[i][j][4]]);
          chairliftPos[i][j][3] = totalPositions[i][chairliftPos[i][j][4]][2] + (totalPositions[i][(chairliftPos[i][j][4]+1)%dsts[i].length][2] - totalPositions[i][chairliftPos[i][j][4]][2]) * (chairliftPos[i][j][5] / dsts[i][chairliftPos[i][j][4]]);

          chairliftPos[i][j][0].translate(chairliftPos[i][j][1] - ox, chairliftPos[i][j][3] - oz, chairliftPos[i][j][2] - oy);

          chairliftPos[i][j][0].translate(-chairliftPos[i][j][1], -chairliftPos[i][j][3], -chairliftPos[i][j][2]);

          var orot = chairliftPos[i][j][6];
          var nr = totalAngles[i][chairliftPos[i][j][4]];

          chairliftPos[i][j][0].rotateY(nr - orot);

          if (ridingLift && i == liftChosen && j == choice) {
            roty += orot - nr;
          }

          chairliftPos[i][j][6] = nr;

          chairliftPos[i][j][0].translate(chairliftPos[i][j][1], chairliftPos[i][j][3], chairliftPos[i][j][2]);

          /*var oox = chairliftPos[i][j][1];
          var ooy = chairliftPos[i][j][2];
          var ooz = chairliftPos[i][j][3];
          //chairliftPos[i][j][0].translate(-chairliftPos[i][j][1], -chairliftPos[i][j][3], -chairliftPos[i][j][2]);
          chairliftPos[i][j][0].position.x -= oox;
          chairliftPos[i][j][0].position.z -= ooy;
          chairliftPos[i][j][0].position.y -= ooz;
          chairliftPos[i][j][0].rotation.x = Math.PI / 400;
          chairliftPos[i][j][0].position.x += oox;
          chairliftPos[i][j][0].position.z += ooy;
          chairliftPos[i][j][0].position.y += ooz;*/


          //chairliftPos[i][j][0].translate(chairliftPos[i][j][1], chairliftPos[i][j][3], chairliftPos[i][j][2]);

        }

      }





      TURN = 0.15 * (FPFAC / avg);

      countdown--;

      ocamx = camx;
      ocamy = camy;

      frm++;

      document.getElementById("num").innerHTML = num+1;



      var mpx4 = lifts[0][1];
      var mpy4 = lifts[0][2];
      var mpx5 = lifts[0][3];
      var mpy5 = lifts[0][4];
      var mpx6 = camx / GRIDSCALE;
      var mpy6 = (grid[0].length + camy /GRIDSCALE);
      var miniAngle1 = Math.atan((mpy5 - mpy4) / (mpx5 - mpx4 + 0.000001));
      if (mpx5 < mpx4) {
        miniAngle1 += Math.PI;
      }

      var mpd1 = Math.sqrt((mpx5-mpx4)*(mpx5-mpx4) + (mpy5-mpy4)*(mpy5-mpy4));
      var mpd2 = Math.sqrt((mpx2-mpx1)*(mpx2-mpx1) + (mpy2-mpy1)*(mpy2-mpy1));
      var mpd3 = Math.sqrt((mpx6-mpx4)*(mpx6-mpx4) + (mpy6-mpy4)*(mpy6-mpy4));

      var miniAngle2 = Math.atan((mpy6 - mpy4) / (mpx6 - mpx4 + 0.000001));
      if (mpx6 < mpx4) {
        miniAngle1 += Math.PI;
      }

      var miniAngle3 = Math.atan((mpy2 - mpy1) / (mpx2 - mpx1 + 0.000001));
      if (mpx2 < mpx1) {
        miniAngle3 += Math.PI;
      }

      var miniAngle4 = miniAngle3 + miniAngle2 - miniAngle1;

      var mpx3 = mpx1 + Math.cos(miniAngle4) * mpd3 * (mpd2 / mpd1);
      var mpy3 = mpy1 + Math.sin(miniAngle4) * mpd3 * (mpd2 / mpd1);


      var anggg = Math.PI/2 - (miniAngle3 + roty - miniAngle1);


      if (mpx6 >= mpx4) {
        anggg += Math.PI;
      }



      document.getElementById("pos").innerHTML = parseInt(mpx3) + " " + parseInt(mpy3) + " " + anggg;
      var px = mouseX;

      mouseX = parseInt(document.getElementById("extra2").innerHTML.split(" ")[0]);
      //mouseY = parseInt(document.getElementById("extra2").innerHTML.split(" ")[1]);
      //mouseX =
      mouseY = 0;


      var tarr = trees[parseInt(camx/(GRIDSCALE*TREEF))][parseInt((-camy/GRIDSCALE)/TREEF)];
      var mn = 1000000000;

      for (var i = 0 ; i < tarr.length ; i++) {
        var x1 = tarr[i][0];
        var y1 = tarr[i][1];
        var x2 = camx;
        var y2 = camy;
        mn = Math.min(mn, Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2)));

        if (Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2)) < 25) {
          treecrash = 100;
          tickt++;
        }
      }

      if (treecrash && !godmode && !ridingLift) {
        camx = lifts[0][3]*GRIDSCALE;
        camy = -(grid[0].length - lifts[0][4]) * GRIDSCALE;
      }

      if (raceInd != -1) {
        document.getElementById("top").hidden = false;
        if (starting > 16) {
          document.getElementById("top").innerHTML = "UPDATE3 Instructions: go to the right of the red slalom poles, and to the left of the blue ones";
        }
        else if (starting > 11) {
          document.getElementById("top").innerHTML = "Your goal is to reach the finish line as fast as possible";
        }
        else if (starting > 6) {
          document.getElementById("top").innerHTML = "Missing slalom poles gives you a time penalty";
        }
        else if (starting > 0) {
          var tst = (parseInt(starting*10)/10);
          if (tst % 1 == 0) {
            tst = tst + ".0";
          }
          document.getElementById("top").innerHTML = "Race starts in " + tst + " seconds!";
        }
        else if (starting > -2) {
          document.getElementById("top").innerHTML = "Ready... Set... Go!";
        }
        else if (finalTime > 0) {
          document.getElementById("top").innerHTML = "You finished the race with a final time of " + (parseInt(finalTime*10)/10) + " seconds! Press O to go back to the menu.";
        }
        else if (pentime > 0) {
          pentime -= 3;
          document.getElementById("top").innerHTML = "You missed a slalom pole, so you have been given a 5 second penalty.";
        }
        else {
          var tst = (parseInt(time*10)/10);
          if (tst % 1 == 0) {
            tst = tst + ".0";
          }
          document.getElementById("top").innerHTML = "Time taken: " + tst + " seconds";
        }
      }
      else if (countdown > 0) {
        if (cpnum < trails[trailInd][3].length / 4 - 1) {
          document.getElementById("top").innerHTML = "Checkpoint " + cpnum + " cleared.";
        }
        else {
          var f = true;
          for (var i = 1 ; i < ch.length ; i++) {
            if (!ch[i]) {
              f = false;
            }
          }

          if (f) {
            document.getElementById("top").innerHTML = "Level cleared! Press O to go back to the menu.";
            success = true;
          }
          else {
            document.getElementById("top").innerHTML = "You didn't get all the checkpoints. Press R to restart the level, and press O to quit.";
            success = false;
          }
        }
      }
      else if (treecrash) {
        document.getElementById("top").innerHTML = "You hit a tree and crashed. Good thing this isn't real life!";
        treecrash --;
      }
      else if (!possible && !ridingLift) {
        document.getElementById("top").innerHTML = "Press W to move forward using your poles (on flat terrain), and use the mouse to turn and look around.";
      }
      else if (possible && !ridingLift) {
        document.getElementById("top").innerHTML = "Press R to ride the lift";
      }
      else {
        document.getElementById("top").innerHTML = "Press and hold Q to fast forward the lift ride";
      }

      /*if (clicked) {
        document.getElementById("top").innerHTML = "clicking";
      }
      else {
        document.getElementById("top").innerHTML = "not clicking";
      }*/

      if (stopped) {
        scene.children.forEach(function(object) {
            scene.remove(object);
        });
        document.getElementById("extra").innerHTML = "Going Back";
      }
      //if (!stopped) {
      else {
        document.getElementById("extra").innerHTML = "Loaded Lifts";
      }

      possible = false;
      var mni = -1;
      var mn = 1000000000;
      for (var i = 0 ; i < lifts.length ; i++) {
        var x1 = camera.position.x;
        var y1 = (camera.position.z);
        var x2 = lifts[i][1]*GRIDSCALE;
        var y2 = -(grid[0].length - lifts[i][2])*GRIDSCALE;

        var dist = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));

        if (dist <= mn) {
          mn = dist;
          mni = i;
        }
      }


      if (mn <= 600) {
        var i = mni;
        if (trailInd == -1) {
          possible = true;
        }
        if (keys[82] && trailInd == -1) {
          ridingLift = true;
          liftChosen = i;

          var mn = 1000000000;
          var mni = 0;
          var mxe = 0;
          for (var j = 0 ; j < chairliftPos[i].length ; j++) {
            var x1 = chairliftPos[i][j][1];
            var y1 = chairliftPos[i][j][2];
            var z1 = chairliftPos[i][j][3];

            var x2 = camera.position.x;
            var y2 = camera.position.z;
            var z2 = camera.position.y;

            var dist = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));

            if (dist < mn) {
              mn = dist;
              mni = j;
            }
          }

          choice = mni;

          roty = Math.PI-chairliftPos[i][choice][6];


        }
      }




      //var canvas = document.getElementById("three").firstChild.getContext('2d');
      //canvas.fillStyle = 'rgb(255, 0, 0)';
      //canvas.fillRect(300, 300, 50, 50);

      //requestAnimationFrame(animate);

      if (ridingLift && chairliftPos[liftChosen][choice][4] >= dsts[liftChosen].length / 2 && chairliftPos[liftChosen][choice][4] < dsts[liftChosen].length*0.75) {
        ridingLift = false;
      }











      if (ridingLift) {
        camx = chairliftPos[liftChosen][choice][1];// + Math.cos(Math.PI - chairliftPos[liftChosen][choice][6]) * 73;
        camy = chairliftPos[liftChosen][choice][2];// +  Math.sin(Math.PI - chairliftPos[liftChosen][choice][6]) * 73;
        //camz =
      }




      friction = FLATFRICTION;

      var PIF = Math.PI / 800;

      console.log("DIFF");
      console.log(difft);

      var CF = 15 * (60 / fps);

      if (turningRight){//mouseX > px) {
        if (ridingLift) {
          roty += (CF) * PIF;
        }
        else {
          roty += Math.min(TURN/1.1, (CF) * PIF)
        }
        friction = TURNFRICTION;
      }
      if (turningLeft){//mouseX < px) {
        if (ridingLift) {
          roty += (-CF) * PIF;
        }
        else {
          roty += Math.min(TURN/1.1, (-CF) * PIF);
        }
        friction = TURNFRICTION;
      }

      var UF = 80;


      var elements = scene.children;

      var mni = -1;
      var mndist = 1000000000;

      var LEN = (elements.length - 2) / 2;

      /*for (var i = 0 ; i < LEN ; i++) {
        var vecs = elements[i].geometry.vertices;
        var avgx = (vecs[0].x + vecs[1].x + vecs[2].x) / 3;
        var avgy = (vecs[0].y + vecs[1].y + vecs[2].y) / 3;
        var avgz = (vecs[0].z + vecs[1].z + vecs[2].z) / 3;
        var dist = Math.sqrt(Math.pow(avgx - camera.position.x, 2) + Math.pow(avgy - camera.position.y, 2) + Math.pow(camera.position.z - avgz, 2));
        if (dist < mndist) {
          mndist = dist;
          mni = i;
        }
      }*/


      for (var i = 0 ; i < elements.length ; i++) {
        elements[i].visible = true;
        //elements[i + LEN].visible = false;
      }

      //mni = parseInt(Math.random()*LEN);
      //elements[mni].visible = false;
      //elements[mni + LEN].visible = true;


      for (var i = 0 ; i < cubes.length ; i++) {
        cubes[i].update();
      }

      /*if (keys[38]) {
        camera.position.z -= 1;
      }
      if (keys[40]) {
        camera.position.z += 1;
      }
      if (keys[37]) {
        camera.position.x -= 1;
      }
      if (keys[39]) {
        camera.position.x += 1;
      }
      if (keys[16]) {
        camera.position.y -= 1;
      }
      if (keys[13]) {
        camera.position.y += 1;
      }*/


      if (keys[16] && !ridingLift && godmode) {
        upd -= UF;
      }
      if (keys[13] && !ridingLift && godmode) {
        upd += UF;
      }


      /*if (camx < CHUNK + 1) {
        camx = CHUNK + 1;
      }
      if (camx > GRIDSCALE * elev.length - CHUNK - 1) {
        camx = GRIDSCALE * elev.length - CHUNK - 1;
      }
      if (camy < CHUNK + 1) {
        camy = CHUNK + 1;
      }
      if (camy > GRIDSCALE * elev[0].length - CHUNK - 1) {
        camy = GRIDSCALE * elev[0].length - CHUNK - 1;
      }*/



      camera.position.x = camx;
      camera.position.z = camy;


      var leftI = parseInt((camera.position.x / GRIDSCALE) / CHUNK) * CHUNK;
      var leftJ = parseInt((grid[0].length - 1 + camera.position.z / GRIDSCALE) / CHUNK) * CHUNK;
      var rightI = leftI + CHUNK;
      var rightJ = leftJ + CHUNK;

      var x0, y0, x1, y1, x2, y2;

      if (y - leftJ < x - leftI) {
        x0 = leftI;
        y0 = leftJ;
        x1 = rightI;
        y1 = leftJ;
        x2 = rightI;
        y2 = rightJ;
      }
      else {
        x0 = leftI;
        y0 = leftJ;
        x1 = leftI;
        y1 = rightJ;
        x2 = rightI;
        y2 = rightJ;
      }


      var z0 = elev[x0][y0];
      var z1 = elev[x1][y1];
      var z2 = elev[x2][y2];


      var vec1 = [x1 - x0, y1 - y0, z1 - z0];
      var vec2 = [x2 - x0, y2 - y0, z2 - z0];

      var cros = [vec1[1] * vec2[2] - vec1[2] * vec2[1], vec1[2] * vec2[0] - vec1[0] * vec2[2], vec1[0] * vec2[1] - vec1[1] * vec2[0]];

      var mx = cros[0];
      var my = cros[1];
      var mz = cros[2] + 0.00000000001;

      var steep = mz * Math.sqrt(mx * mx + my * my);

      var dx = Math.cos(-roty);
      var dy = -Math.sin(-roty);

      var elevat = (getElevation(camera.position.x / GRIDSCALE, (grid[0].length - 1 + camera.position.z / GRIDSCALE)) * (ELFA * (XF / 2.3)));
      camera.position.y = elevat + upd;


      if (starting <= 0) {

        playerSpeed += (((-mx/mz)*dx + (-my/mz)*dy)/-0.4) * ACCEL;


        playerSpeed /= friction;




        if ((poling || keys[87]) && playerSpeed < POLE * 0.55) {
          playerSpeed = Math.max(playerSpeed, POLE);
        }

        playerSpeed = Math.max(playerSpeed, 0);

        camx += Math.cos(-roty) * playerSpeed * (FPFAC / avg);
        camy -= Math.sin(-roty) * playerSpeed * (FPFAC / avg);


        if (keys[81] && godmode && !ridingLift) {
          camx += Math.cos(-roty) * 96 * (FPFAC / avg);
          camy -= Math.sin(-roty) * 96 * (FPFAC / avg);
        }

        var elevat = (getElevation(camera.position.x / GRIDSCALE, (grid[0].length - 1 + camera.position.z / GRIDSCALE)) * (ELFA * (XF / 2.3)));

        if (ridingLift) {
          camera.position.y = chairliftPos[liftChosen][choice][3] - 35;

        }
      }





      //camera.lookAt(camera.position.x, camera.position.y - 10, camera.position.z);

      if (keys[74]) {
        rotz -= 0.02;
      }
      if (keys[75]) {
        rotz += 0.02;
      }
      /*if (keys[77]) {
        rotx -= 0.02;
      }
      if (keys[73]) {
        rotx += 0.02;
      }*/

      rotx = -mouseY * (Math.PI / 700) - MFA;

      if (rotx < -Math.PI / 3) {
        rotx = -Math.PI/3;
        MFA -= rotx + Math.PI/3
      }
      if (rotx > Math.PI / 3) {
        MFA += rotx - Math.PI / 3;
      }


      if (keys[80] && godmode && !ridingLift) {
        upd = 6;
      }




      //camera.rotation.z = -Math.PI / 2;
      camera.lookAt(camera.position.x + 5*Math.cos(roty)*Math.cos(rotx), camera.position.y + 5*Math.sin(rotx), camera.position.z + 5*Math.sin(roty)*Math.cos(rotx));




      //x = Math.cos(fc * (100 / 360) * (Math.PI / 180)) * 10;
      //y = Math.sin(fc * (100 / 360) * (Math.PI / 180)) * 10;
      fc++;


      //controls.update();

      /*for (var i = 0 ; i < 500 ; i++) {
        keys[i] = false;
      }*/
      //}

      if (finalTime > 0) {

        quit();

        //aboutRun2();
      }
      else {

        setTimeout(animate, 1000/60);
      }

      if (trailInd != -1) {
        for (var i = 0 ; i < banpos.length ; i += 4) {
          var x1 = banpos[i];
          var y1 = banpos[i+1];
          var x2 = banpos[i+2];
          var y2 = banpos[i+3];

          var m = (y2 - y1) / (x2 - x1);
          var b = y1 - m * x1;

          var dy = camx * m + b;

          if (i == 16) {
          }

          if (camy >= dy) {
            if (!on[i/4]) {
              on[i/4] = true;
              if (i>0 && ocamx >= Math.min(x1,x2) - 100 && ocamx <= Math.max(x1,x2) + 100 && ocamy >= Math.min(y1,y2) - 100 && ocamy <= Math.max(y1,y2) + 100) {
                //if (!ch[i/4]) {
                //}
                if (!ch[i/4]) {
                  countdown = cpval;
                  cpnum = i/4;
                }
                ch[i/4] = true;
              }
              else if (i==16) {
              }
            }

          }
          else if (camy < dy) {
            if (on[i/4]) {
              on[i/4] = false;
              if (i>0 && ocamx >= Math.min(x1,x2)-100 && ocamx <= Math.max(x1,x2)+100 && ocamy >= Math.min(y1,y2)-100 && ocamy <= Math.max(y1,y2)+100) {
                //if (!ch[i/4]) {
                  if (!ch[i/4]) {
                    countdown = cpval;
                    cpnum = i/4;
                  }
                //}
                ch[i/4] = true;
              }
              else if (i==16) {
              }
            }
          }
        }

      }

      if (raceInd != -1) {
        for (var i = 0 ; i < sloms.length ; i ++) {
          var x1 = sloms[i][0];
          var y1 = sloms[i][1];
          var x2 = sloms[i][2];
          var y2 = sloms[i][3];

          var m = (y2 - y1) / (x2 - x1);
          var b = y1 - m * x1;

          var dy = camx * m + b;


          var crossed = false;

          if (i == 2) {
          }

          if (camy >= dy && !onr[i]) {
            onr[i] = true;
            crossed = true;
          }
          else if (camy < dy && onr[i]) {
            onr[i] = false;
            crossed = true;
          }

          if (crossed) {
            var x3 = camx;
            var y3 = camy;
            var x4 = ocamx+0.000001;
            var y4 = ocamy+0.000001;

            var m2 = (y4-y3)/(x4-x3);
            var b2 = y4 - m2*x3;

            var intx = (b2 - b) / (m - m2);
            var inty = m2 * intx + b2;



            var d1 = Math.sqrt((intx-x1)*(intx-x1) + (inty-y1)*(inty-y1));
            var d2 = Math.sqrt((intx-x2)*(intx-x2) + (inty-y2)*(inty-y2));

            if (i > 0 && i < sloms.length - 1) {
              if (Math.min(d1, d2) < 4000) {
                if (Math.max(d1, d2) < Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1))+25) {
                  //through the slalom
                  pentime = 100;
                  time += 5;
                }
                else if ((d1 < d2 && i%2 == 1) || (d1 > d2 && i%2 == 0)) {
                  pentime = 100;
                  time += 5;
                }
                else {
                }
              }
            }
            else if (i == sloms.length - 1) {
              if (intx >= Math.min(x1,x2) - 375 && intx <= Math.max(x1,x2) + 25 && inty >= Math.min(y1,y2)-25 && inty <= Math.max(y1,y2)+25) {
                finalTime = time;
              }
            }
          }
        }
      }


      //document.getElementById("top").innerHTML = alpha + " " + beta + " " + gamma;
      difft = 0;

    }

    animate();


    function quit() {
      running = false;
      loaded = false;

      while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
      }

      document.getElementById("extra").innerHTML = "Going Back";

      document.getElementById("extra3").innerHTML = raceInd + " " + finalTime;


      if (finalTime) {
        document.getElementById("result").innerHTML = "Time " + raceInd + " " + finalTime;
      }
      else if (success) {
        document.getElementById("result").innerHTML = trailInd;
      }
      else {
        document.getElementById("result").innerHTML = -1;
      }

      //document.getElementById("extra").innerHTML = "";


      document.exitPointerLock();

      document.getElementById("minimap").width = 0;
      document.getElementById("minimap").height = 0;

      //document.getElementById("minimap").getContext('2d').fillStyle = 'rgb(255,255,255)';
      //document.getElementById("minimap").getContext('2d').fillRect(-1000, -1000, 2000, 2000);

      document.getElementById("extra").height = 0;
      document.getElementById("top").innerHTML = "";

      document.getElementById("game").width = window.innerWidth;
      document.getElementById("game").height = 270 + 50 * 207 + 50;

      document.getElementById("three").removeChild(renderer.domElement);

      document.getElementById("three").width = 0;
      document.getElementById("three").height = 0;
      //num++;
    }

  }

  main();

  function update() {

  }

  window.setInterval(update, 1000);
}

var elem = document.getElementById("game");
var left = elem.offsetLeft + elem.clientLeft;
var etop = elem.offsetTop + elem.clientTop;
var context = elem.getContext('2d');

var num = -1;

function aboutRun() {

  document.getElementById("game").width = 0;
  document.getElementById("game").height = 0;

  document.getElementById("selimg").width = window.innerWidth;
  document.getElementById("selimg").height = (imgs[num+1].height/imgs[num+1].width)*window.innerWidth;
  var g = document.getElementById("selimg").getContext('2d');
  g.fillStyle = 'rgb(255, 0, 0)';
  g.drawImage(imgs[num+1], 0, 0, window.innerWidth, (imgs[num+1].height/imgs[num+1].width)*window.innerWidth);

  g.fillStyle = 'rgb(255, 255, 255)';

  g.fillRect(window.innerWidth*0, 0, window.innerWidth, 30);

  g.fillStyle = 'rgb(0, 0, 0)';
  g.font = '18px Avenir';
  g.fillText("Click on the map to select a starting location", window.innerWidth*0.37, 20);
  //runProgram(num);
}

function aboutRun2() {
  document.getElementById("selimg").width = 0;
  document.getElementById("selimg").height = 0;

  runProgram(num, trailInd, raceInd);
}

elem.addEventListener('mousemove', function(event) {
  var x = event.pageX - left;
  var y = event.pageY - etop;
});

var clicking = false;

var left = elem.offsetLeft + elem.clientLeft;
var etop = elem.offsetTop + elem.clientTop;
var mountSel = 2;

elem.addEventListener('mousedown', function(event) {
  var x = event.pageX - left;
  var y = event.pageY - etop;
  //mouseY = y;


  if (!running && !clicking) {
    var width = elem.width;
    var height = elem.height;
    if (mountSel == 0) {
      var x = event.pageX - left;
      var y = event.pageY - etop;



      if (x >= width*0.65-50 && x <= width*0.65+50 && y >= 200 && y <= 240) {

        stats.sort(function(a, b) { return b[2] - a[2] });

      }
      if (x >= width*0.75-50 && x <= width*0.75+50 && y >= 200 && y <= 240) {

          stats.sort(function(a, b) { return b[3] - a[3] });

      }
      if (x >= width*0.85-50 && x <= width*0.85+50 && y >= 200 && y <= 240) {

          stats.sort(function(a, b) { return b[4] - a[4] });

      }


      for (var i = 0  ; i < stats.length ; i++) {

        if (x >= width*0.1 && x <= width*0.9 && y >= 249 +i*50 && y <= 291 + i*50) {

          num = stats[i][5];

          raceInd = -1;
          trailInd = -1;

          aboutRun();

          //clicking = true;
        }
      }
    }
    else if (mountSel == 1) {
      for (var i = 0  ; i < trails.length ; i++) {

        if (x >= width*0.1 && x <= width*0.9 && y >= 249 +i*50 && y <= 291 + i*50) {

          trailInd = i;
          raceInd = -1;
          num = trails[i][1]-1;

          startX = (trails[i][3][0] + trails[i][3][2]) / 2;
          startY = (trails[i][3][1] + trails[i][3][3]) / 2;


          aboutRun2();

          //clicking = true;
        }
      }
    }
    else if (mountSel == 2) {
      for (var i = 0  ; i < races.length ; i++) {

        if (x >= width*0.1 && x <= width*0.9 && y >= 249 +i*50 && y <= 291 + i*50) {

          trailInd = -1;
          raceInd = i;
          num = races[i][1]-1;

          startX = (races[i][2][0] + races[i][2][2]) / 2;
          startY = (races[i][2][1] + races[i][2][3]) / 2;


          aboutRun2();

          //clicking = true;
        }
      }
    }
  }
});

var elem3 = document.getElementById("selimg");
var left = elem3.offsetLeft + elem3.clientLeft;
var etop = elem3.offsetTop + elem3.clientTop;
var context = elem.getContext('2d');

var msl = 0;

elem3.addEventListener('mousedown', function(event) {
  var x = event.pageX - left;
  var y = event.pageY - etop;

  startX = x * (document.getElementById(num+1).width / document.getElementById("selimg").width);
  startY = y * (document.getElementById(num+1).width / document.getElementById("selimg").width);



  var g = document.getElementById("selimg").getContext('2d');

  g.fillStyle = 'rgb(255, 255, 255)';

  g.fillRect(window.innerWidth*0, 0, window.innerWidth, 30);

  g.fillStyle = 'rgb(0, 0, 0)';
  g.font = '18px Avenir';
  g.fillText("Loading...", window.innerWidth*0.37, 20);

  window.setTimeout(aboutRun2, 100);
});

/*window.addEventListener('deviceorientation', function(e) {
  document.getElementById("top").innerHTML = 'TILTING';
});*/

//if (window.deviceOrientation)
/*elem = document.getElementById("topbar");
left = elem.offsetLeft + elem.clientLeft;
etop = elem.offsetTop + elem.clientTop;
context = elem.getContext('2d');
elem.addEventListener('mousedown', function(event) {
  if (running) {
    var x = event.pageX - left;
    var y = event.pageY - etop;
    if (x >= window.innerWidth*0.5 - 60 && x <= window.innerWidth*0.5 + 60 && y >= 5 && y <= 45) {
      stopped = true;
    }
  }
});*/

/*var ticker = 0;
function go() {
  document.getElementById("game").visible = false;
  ticker++;
  if (ticker >= 10){
    //runProgram(parseInt(Math.random()*7));
  }
  else {
    window.setTimeout(go, 500);
  }
}
go();*/
