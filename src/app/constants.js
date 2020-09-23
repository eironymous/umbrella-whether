import { mergeNoteLists } from "./note-list-tools";

/**
 * Used to define the scale for requests for the weatherstack API. Requests may return values in:
 *   - Metric units:
 * 		- Celsius (temperature)
 * 		- km/h (wind speed)
 * 		- km (visibility)
 * 		- mm (precip)
 * 		- cm (total snow)
 * 		- mb (pressure)
 * 
 * 	- Fahrenheit + Imperial units:
 * 		- Fahrenheit (temperature)
 * 		- mph (wind speed)
 * 		- m (visibility)
 * 		- in (precip + total snow)
 * 		- mb (pressure)
 * 
 * 	- Scientific units:
 * 		- Kelvin (temperature)
 * 		- hm/h (wind speed)
 * 		- km (visibility)
 * 		- mm (precip)
 * 		- cm (total snow)
 * 		- mb (pressure)
 */
export const METRIC_SCALE = "metric";
export const FAHRENHEIT_SCALE = "imperial";
export const SCIENTIFIC_SCALE = "standard";

export const METRIC_UNITS = {
	temperature: "°C",
	windSpeed: "m/sec",
	visibility: "meters",
	precip: "mm",
	totalSnow: "mm",
	pressure: "hPa",
};

export const FAHRENHEIT_UNITS = {
	temperature: "°F",
	windSpeed: "mph",
	visibility: "meters",
	precip: "mm",
	totalSnow: "mm",
	pressure: "hPa",
};

export const SCIENTIFIC_UNITS = {
	temperature: "°K",
	windSpeed: "m/sec",
	visibility: "meters",
	precip: "mm",
	totalSnow: "mm",
	pressure: "hPa",
};

export const COUNTRY_CODES = {
	'AF': 'Afghanistan',
	'AX': 'Aland Islands',
	'AL': 'Albania',
	'DZ': 'Algeria',
	'AS': 'American Samoa',
	'AD': 'Andorra',
	'AO': 'Angola',
	'AI': 'Anguilla',
	'AQ': 'Antarctica',
	'AG': 'Antigua And Barbuda',
	'AR': 'Argentina',
	'AM': 'Armenia',
	'AW': 'Aruba',
	'AU': 'Australia',
	'AT': 'Austria',
	'AZ': 'Azerbaijan',
	'BS': 'Bahamas',
	'BH': 'Bahrain',
	'BD': 'Bangladesh',
	'BB': 'Barbados',
	'BY': 'Belarus',
	'BE': 'Belgium',
	'BZ': 'Belize',
	'BJ': 'Benin',
	'BM': 'Bermuda',
	'BT': 'Bhutan',
	'BO': 'Bolivia',
	'BA': 'Bosnia And Herzegovina',
	'BW': 'Botswana',
	'BV': 'Bouvet Island',
	'BR': 'Brazil',
	'IO': 'British Indian Ocean Territory',
	'BN': 'Brunei Darussalam',
	'BG': 'Bulgaria',
	'BF': 'Burkina Faso',
	'BI': 'Burundi',
	'KH': 'Cambodia',
	'CM': 'Cameroon',
	'CA': 'Canada',
	'CV': 'Cape Verde',
	'KY': 'Cayman Islands',
	'CF': 'Central African Republic',
	'TD': 'Chad',
	'CL': 'Chile',
	'CN': 'China',
	'CX': 'Christmas Island',
	'CC': 'Cocos (Keeling) Islands',
	'CO': 'Colombia',
	'KM': 'Comoros',
	'CG': 'Congo',
	'CD': 'Congo, Democratic Republic',
	'CK': 'Cook Islands',
	'CR': 'Costa Rica',
	'CI': 'Cote D\'Ivoire',
	'HR': 'Croatia',
	'CU': 'Cuba',
	'CY': 'Cyprus',
	'CZ': 'Czech Republic',
	'DK': 'Denmark',
	'DJ': 'Djibouti',
	'DM': 'Dominica',
	'DO': 'Dominican Republic',
	'EC': 'Ecuador',
	'EG': 'Egypt',
	'SV': 'El Salvador',
	'GQ': 'Equatorial Guinea',
	'ER': 'Eritrea',
	'EE': 'Estonia',
	'ET': 'Ethiopia',
	'FK': 'Falkland Islands (Malvinas)',
	'FO': 'Faroe Islands',
	'FJ': 'Fiji',
	'FI': 'Finland',
	'FR': 'France',
	'GF': 'French Guiana',
	'PF': 'French Polynesia',
	'TF': 'French Southern Territories',
	'GA': 'Gabon',
	'GM': 'Gambia',
	'GE': 'Georgia',
	'DE': 'Germany',
	'GH': 'Ghana',
	'GI': 'Gibraltar',
	'GR': 'Greece',
	'GL': 'Greenland',
	'GD': 'Grenada',
	'GP': 'Guadeloupe',
	'GU': 'Guam',
	'GT': 'Guatemala',
	'GG': 'Guernsey',
	'GN': 'Guinea',
	'GW': 'Guinea-Bissau',
	'GY': 'Guyana',
	'HT': 'Haiti',
	'HM': 'Heard Island & Mcdonald Islands',
	'VA': 'Holy See (Vatican City State)',
	'HN': 'Honduras',
	'HK': 'Hong Kong',
	'HU': 'Hungary',
	'IS': 'Iceland',
	'IN': 'India',
	'ID': 'Indonesia',
	'IR': 'Iran, Islamic Republic Of',
	'IQ': 'Iraq',
	'IE': 'Ireland',
	'IM': 'Isle Of Man',
	'IL': 'Israel',
	'IT': 'Italy',
	'JM': 'Jamaica',
	'JP': 'Japan',
	'JE': 'Jersey',
	'JO': 'Jordan',
	'KZ': 'Kazakhstan',
	'KE': 'Kenya',
	'KI': 'Kiribati',
	'KR': 'Korea',
	'KW': 'Kuwait',
	'KG': 'Kyrgyzstan',
	'LA': 'Lao People\'s Democratic Republic',
	'LV': 'Latvia',
	'LB': 'Lebanon',
	'LS': 'Lesotho',
	'LR': 'Liberia',
	'LY': 'Libyan Arab Jamahiriya',
	'LI': 'Liechtenstein',
	'LT': 'Lithuania',
	'LU': 'Luxembourg',
	'MO': 'Macao',
	'MK': 'Macedonia',
	'MG': 'Madagascar',
	'MW': 'Malawi',
	'MY': 'Malaysia',
	'MV': 'Maldives',
	'ML': 'Mali',
	'MT': 'Malta',
	'MH': 'Marshall Islands',
	'MQ': 'Martinique',
	'MR': 'Mauritania',
	'MU': 'Mauritius',
	'YT': 'Mayotte',
	'MX': 'Mexico',
	'FM': 'Micronesia, Federated States Of',
	'MD': 'Moldova',
	'MC': 'Monaco',
	'MN': 'Mongolia',
	'ME': 'Montenegro',
	'MS': 'Montserrat',
	'MA': 'Morocco',
	'MZ': 'Mozambique',
	'MM': 'Myanmar',
	'NA': 'Namibia',
	'NR': 'Nauru',
	'NP': 'Nepal',
	'NL': 'Netherlands',
	'AN': 'Netherlands Antilles',
	'NC': 'New Caledonia',
	'NZ': 'New Zealand',
	'NI': 'Nicaragua',
	'NE': 'Niger',
	'NG': 'Nigeria',
	'NU': 'Niue',
	'NF': 'Norfolk Island',
	'MP': 'Northern Mariana Islands',
	'NO': 'Norway',
	'OM': 'Oman',
	'PK': 'Pakistan',
	'PW': 'Palau',
	'PS': 'Palestinian Territory, Occupied',
	'PA': 'Panama',
	'PG': 'Papua New Guinea',
	'PY': 'Paraguay',
	'PE': 'Peru',
	'PH': 'Philippines',
	'PN': 'Pitcairn',
	'PL': 'Poland',
	'PT': 'Portugal',
	'PR': 'Puerto Rico',
	'QA': 'Qatar',
	'RE': 'Reunion',
	'RO': 'Romania',
	'RU': 'Russian Federation',
	'RW': 'Rwanda',
	'BL': 'Saint Barthelemy',
	'SH': 'Saint Helena',
	'KN': 'Saint Kitts And Nevis',
	'LC': 'Saint Lucia',
	'MF': 'Saint Martin',
	'PM': 'Saint Pierre And Miquelon',
	'VC': 'Saint Vincent And Grenadines',
	'WS': 'Samoa',
	'SM': 'San Marino',
	'ST': 'Sao Tome And Principe',
	'SA': 'Saudi Arabia',
	'SN': 'Senegal',
	'RS': 'Serbia',
	'SC': 'Seychelles',
	'SL': 'Sierra Leone',
	'SG': 'Singapore',
	'SK': 'Slovakia',
	'SI': 'Slovenia',
	'SB': 'Solomon Islands',
	'SO': 'Somalia',
	'ZA': 'South Africa',
	'GS': 'South Georgia And Sandwich Isl.',
	'ES': 'Spain',
	'LK': 'Sri Lanka',
	'SD': 'Sudan',
	'SR': 'Suriname',
	'SJ': 'Svalbard And Jan Mayen',
	'SZ': 'Swaziland',
	'SE': 'Sweden',
	'CH': 'Switzerland',
	'SY': 'Syrian Arab Republic',
	'TW': 'Taiwan',
	'TJ': 'Tajikistan',
	'TZ': 'Tanzania',
	'TH': 'Thailand',
	'TL': 'Timor-Leste',
	'TG': 'Togo',
	'TK': 'Tokelau',
	'TO': 'Tonga',
	'TT': 'Trinidad And Tobago',
	'TN': 'Tunisia',
	'TR': 'Turkey',
	'TM': 'Turkmenistan',
	'TC': 'Turks And Caicos Islands',
	'TV': 'Tuvalu',
	'UG': 'Uganda',
	'UA': 'Ukraine',
	'AE': 'United Arab Emirates',
	'GB': 'United Kingdom',
	'US': 'United States',
	'UM': 'United States Outlying Islands',
	'UY': 'Uruguay',
	'UZ': 'Uzbekistan',
	'VU': 'Vanuatu',
	'VE': 'Venezuela',
	'VN': 'Viet Nam',
	'VG': 'Virgin Islands, British',
	'VI': 'Virgin Islands, U.S.',
	'WF': 'Wallis And Futuna',
	'EH': 'Western Sahara',
	'YE': 'Yemen',
	'ZM': 'Zambia',
	'ZW': 'Zimbabwe'
}

export const STATE_CODES = {
	'Alabama': 'AL',
	'Alaska': 'AK',
	'Arizona': 'AZ',
	'Arkansas': 'AR',
	'California': 'CA',
	'Colorado': 'CO',
	'Connecticut': 'CT',
	'Delaware': 'DE',
	'District of Columbia': 'DC',
	'Washington DC': 'DC',
	'Florida': 'FL',
	'Georgia': 'GA',
	'Hawaii': 'HI',
	'Idaho': 'ID',
	'Illinois': 'IL',
	'Indiana': 'IN',
	'Iowa': 'IA',
	'Kansas': 'KS',
	'Kentucky': 'KY',
	'Louisiana': 'LA',
	'Maine': 'ME',
	'Maryland': 'MD',
	'Massachusetts': 'MA',
	'Michigan': 'MI',
	'Minnesota': 'MN',
	'Mississippi': 'MS',
	'Missouri': 'MS',
	'Montana': 'MT',
	'Nebraska': 'NE',
	'Nevada': 'NV',
	'New Hampshire': 'NH',
	'New Jersey': 'NJ',
	'New Mexico': 'NM',
	'New York': 'NY',
	'North Carolina': 'NC',
	'North Dakota': 'ND',
	'Ohio': 'OH',
	'Oklahoma': 'OK',
	'Oregon': 'OR',
	'Pennsylvania': 'PA',
	'Rhode Island': 'RI',
	'South Carolina': 'SC',
	'Tennessee': 'TN',
	'Texas': 'TX',
	'Utah': 'UT',
	'Vermont': 'VT',
	'Washington': 'WA',
	'West Virginia': 'WV',
	'Wiconsin': 'WI',
	'Wyoming': 'WY'
}