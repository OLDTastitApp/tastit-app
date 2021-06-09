// types
import { District } from '@types'


// export const districts: District[] = [
//    '1er', ...[...Array(19)].map((_, i) => `${i + 2}ème`)
// ].map((name, i) => ({ id: `${i}`, name }));

export const districts: District[] = [
   '1er', ...[...Array(19)].map((_, i) => `${i + 2}ème`)
].map((name, i) => ({
   id: `750${''.padEnd(+(i > 10), '0')}${i}`,
   name,
}));

export const response = {
    "html_attributions" : [],
    "next_page_token" : "CqQCHwEAAEqyinDc-aEksQwj1ZYEZxE7I7Gj_sIoX97b73g4v5E31f3GKbRx023uTdHJEMVSBw0swMl9h0hlDdty5zkRlyIC-uGqjpOxbqTbvQnu8sOh_4Drfl6PsfZjeYexnyDgeyPKedg4Cy_GLdTczh1pvdG-ofiWbm9YF0UO5nNs0NvfKKn-EPunJDSHU6JDPMX4WzH3R283rO9V_sc8BZPhO983i-QmCLFSvoCkYWt63dOfQ5Z7Iu-9VdsMQqzQCA0pCGWgOXCmXRW5BczB3oMBfQbUTSHqkF6AbTlWDIGJuuVflfncu1acYO6tu59i7q2mwSGvbqop2J3yMMGDrJ9e1so7-V5mibIntZNlxSkg3fUhpH_h2jb_CI_7JV9VcQeaShIQSO5JpntkxXdb90t6bk396xoUsV1Ed7PEio5tnZNYt11ZeT_6YR0",
    "results" : [
       {
          "business_status" : "OPERATIONAL",
          "geometry" : {
             "location" : {
                "lat" : 48.8682311,
                "lng" : 2.300383999999999
             },
             "viewport" : {
                "northeast" : {
                   "lat" : 48.8695200802915,
                   "lng" : 2.301801130291501
                },
                "southwest" : {
                   "lat" : 48.8668221197085,
                   "lng" : 2.299103169708498
                }
             }
          },
          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
          "name" : "Hotel De Sers",
          "opening_hours" : {
             "open_now" : true
          },
          "photos" : [
             {
                "height" : 4480,
                "html_attributions" : [
                   "\u003ca href=\"https://maps.google.com/maps/contrib/115226586013482553941\"\u003eHôtel de Sers\u003c/a\u003e"
                ],
                "photo_reference" : "CmRaAAAAuLvmtTDhXhcw8-M8JvAyaeoUXaW_SHmFtowR5uVC-NNT7x3SbY5h86wkyI5iRCkCT-ncU6dVHj9dbtm-0X7j-Wpk9HCk1DD5nQ1n7r23QDJGKRpseZO8iF_LvDwAZSRUEhBiDnq_MleVCUolm4u4-pTIGhSnvqcoUjVdZ5dbce0LszEtOiKImw",
                "width" : 6720
             }
          ],
          "place_id" : "ChIJJbSToMJv5kcRRIHr7XRtvIY",
          "plus_code" : {
             "compound_code" : "V892+75 Paris, France",
             "global_code" : "8FW4V892+75"
          },
          "rating" : 4.5,
          "reference" : "ChIJJbSToMJv5kcRRIHr7XRtvIY",
          "scope" : "GOOGLE",
          "types" : [
             "lodging",
             "bar",
             "restaurant",
             "food",
             "point_of_interest",
             "establishment"
          ],
          "user_ratings_total" : 245,
          "vicinity" : "41 Avenue Pierre 1er de Serbie, Paris"
       },
       {
          "business_status" : "OPERATIONAL",
          "geometry" : {
             "location" : {
                "lat" : 48.86551739999999,
                "lng" : 2.3038689
             },
             "viewport" : {
                "northeast" : {
                   "lat" : 48.86690103029149,
                   "lng" : 2.305176480291502
                },
                "southwest" : {
                   "lat" : 48.86420306970849,
                   "lng" : 2.302478519708498
                }
             }
          },
          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
          "name" : "Hôtel Montaigne",
          "opening_hours" : {
             "open_now" : true
          },
          "photos" : [
             {
                "height" : 1367,
                "html_attributions" : [
                   "\u003ca href=\"https://maps.google.com/maps/contrib/114875162093156407852\"\u003eHôtel Montaigne Paris\u003c/a\u003e"
                ],
                "photo_reference" : "CmRaAAAAjdNu-MbpoJDxQ5Ehyy6rJwBAAw4CTDZzUVs7vr53STJM6jpbv-p2fyn_h7uEcj6pGBAxbhqOAQT_fLTGi5Zqz47grh2G6wf7W4DeazSbBsI-JGPZS1WoSRFAC24VK7qPEhC3dZmHvca6ts4AcdM-d1Y3GhTtIXbcxO_BBIe4LjuijtJcODDj4Q",
                "width" : 2048
             }
          ],
          "place_id" : "ChIJYSP-5dxv5kcR_gfk9fLBadE",
          "plus_code" : {
             "compound_code" : "V883+6G Paris, France",
             "global_code" : "8FW4V883+6G"
          },
          "rating" : 4.2,
          "reference" : "ChIJYSP-5dxv5kcR_gfk9fLBadE",
          "scope" : "GOOGLE",
          "types" : [ "lodging", "restaurant", "food", "point_of_interest", "establishment" ],
          "user_ratings_total" : 85,
          "vicinity" : "6 Avenue Montaigne, Paris"
       },
       {
          "business_status" : "OPERATIONAL",
          "geometry" : {
             "location" : {
                "lat" : 48.8668137,
                "lng" : 2.302872299999999
             },
             "viewport" : {
                "northeast" : {
                   "lat" : 48.8682106802915,
                   "lng" : 2.304159580291502
                },
                "southwest" : {
                   "lat" : 48.8655127197085,
                   "lng" : 2.301461619708498
                }
             }
          },
          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
          "name" : "La Tremoille Hotel",
          "opening_hours" : {
             "open_now" : true
          },
          "photos" : [
             {
                "height" : 2322,
                "html_attributions" : [
                   "\u003ca href=\"https://maps.google.com/maps/contrib/113958963141277262374\"\u003eVicki Simpson\u003c/a\u003e"
                ],
                "photo_reference" : "CmRaAAAAomvnSvwyEj355gLM7BqN5XjnD0Bpd7kVOHgXpZI7i4d0ysoTpbkojRFtnFahwwSZ8-vNPoeDxch2mE292z2uyYTrKlWO9b1WdgUhp2KORbo1KH0z8uPqUdj5uhlvKPDrEhDp-joEZrtmJ7mTQiXkAYHnGhR4JxVvGhvEhx1vTH0AxDxVUbOhww",
                "width" : 4128
             }
          ],
          "place_id" : "ChIJj9x3Lt1v5kcRXCnMm0yCL8I",
          "plus_code" : {
             "compound_code" : "V883+P4 Paris, France",
             "global_code" : "8FW4V883+P4"
          },
          "rating" : 4.3,
          "reference" : "ChIJj9x3Lt1v5kcRXCnMm0yCL8I",
          "scope" : "GOOGLE",
          "types" : [ "lodging", "restaurant", "food", "point_of_interest", "establishment" ],
          "user_ratings_total" : 164,
          "vicinity" : "14 Rue de la Tremoille, Paris"
       },
       {
          "business_status" : "CLOSED_TEMPORARILY",
          "geometry" : {
             "location" : {
                "lat" : 48.8666594,
                "lng" : 2.3090132
             },
             "viewport" : {
                "northeast" : {
                   "lat" : 48.8679436802915,
                   "lng" : 2.310401630291502
                },
                "southwest" : {
                   "lat" : 48.8652457197085,
                   "lng" : 2.307703669708498
                }
             }
          },
          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/civic_building-71.png",
          "name" : "Hôtel La Maison Champs Elysées",
          "permanently_closed" : true,
          "photos" : [
             {
                "height" : 4540,
                "html_attributions" : [
                   "\u003ca href=\"https://maps.google.com/maps/contrib/108799857467506677013\"\u003eHôtel La Maison Champs Elysées\u003c/a\u003e"
                ],
                "photo_reference" : "CmRaAAAAYFKzwk7qWuyIf-2YoJuewOhDlzPfxIWtPj9nDS8VYgZ7LU5y3BcmHbgVHVxNrIYDqqSLOrxgvNN_5mPIR3wJA9fRxD5JtTJnEjYLVaAQkI3Ejv-lkStSNLpfab34jIKgEhA3GU4KF4wifIWX0WTKO5qcGhSwkKQ1ioMVjiBhbRplM9EgCY5-lg",
                "width" : 7360
             }
          ],
          "place_id" : "ChIJc8zx1tpv5kcR4XnN_LMREjQ",
          "plus_code" : {
             "compound_code" : "V885+MJ Paris, France",
             "global_code" : "8FW4V885+MJ"
          },
          "rating" : 4.2,
          "reference" : "ChIJc8zx1tpv5kcR4XnN_LMREjQ",
          "scope" : "GOOGLE",
          "types" : [
             "city_hall",
             "local_government_office",
             "lodging",
             "restaurant",
             "food",
             "point_of_interest",
             "establishment"
          ],
          "user_ratings_total" : 303,
          "vicinity" : "Au sein de La Maison des Centraliens, 8 Rue Jean Goujon, Paris"
       },
       {
          "business_status" : "OPERATIONAL",
          "geometry" : {
             "location" : {
                "lat" : 48.8581346,
                "lng" : 2.2945077
             },
             "viewport" : {
                "northeast" : {
                   "lat" : 48.8594727302915,
                   "lng" : 2.295836080291501
                },
                "southwest" : {
                   "lat" : 48.8567747697085,
                   "lng" : 2.293138119708498
                }
             }
          },
          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
          "name" : "Jules Verne",
          "opening_hours" : {
             "open_now" : false
          },
          "photos" : [
             {
                "height" : 809,
                "html_attributions" : [
                   "\u003ca href=\"https://maps.google.com/maps/contrib/103553920573835766235\"\u003eLe Jules Verne\u003c/a\u003e"
                ],
                "photo_reference" : "CmRaAAAAuZNASl6CjHFrM9mTZFbVvJW7Aolh209gPIHbiHKhB5P5xQNCr9yCacM4BKkvmG-AqWpIA4WykZDfVL5uDRXsOha5wXk7MkVbrvJRYxjeNj2oyy9jpzAKEDhkvufBN3O9EhAryR2NspDqXXoLScVVK67AGhTMJKUL5pDYNDVLJGRcJj_c-RktnQ",
                "width" : 1080
             }
          ],
          "place_id" : "ChIJl_7p8uFv5kcRj5ZGEf31ILM",
          "plus_code" : {
             "compound_code" : "V75V+7R Paris, France",
             "global_code" : "8FW4V75V+7R"
          },
          "price_level" : 4,
          "rating" : 4.2,
          "reference" : "ChIJl_7p8uFv5kcRj5ZGEf31ILM",
          "scope" : "GOOGLE",
          "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
          "user_ratings_total" : 1045,
          "vicinity" : "Avenue Gustave Eiffel, Paris"
       },
       {
          "business_status" : "OPERATIONAL",
          "geometry" : {
             "location" : {
                "lat" : 48.858823,
                "lng" : 2.2841109
             },
             "viewport" : {
                "northeast" : {
                   "lat" : 48.86014303029151,
                   "lng" : 2.285433180291502
                },
                "southwest" : {
                   "lat" : 48.85744506970851,
                   "lng" : 2.282735219708498
                }
             }
          },
          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
          "name" : "Hotel Maison FL",
          "opening_hours" : {
             "open_now" : true
          },
          "photos" : [
             {
                "height" : 1564,
                "html_attributions" : [
                   "\u003ca href=\"https://maps.google.com/maps/contrib/106581947088592609565\"\u003eHotel Maison FL\u003c/a\u003e"
                ],
                "photo_reference" : "CmRaAAAAxv17Xrca97kn0TQMSPmb-ct4K2PysKS9M-NyF4GA5hk5P_Nd4sV4HCOxPhgP2k1HV4WuLZwkGSVt1u5M1cKfbfT4eyl1AvBVnXbpFUwUebVTUbZnG7dDVZGxdjiT3uwhEhARsuGtDQ1DOgD9f6p2CqCoGhTEoQ9mG7xH8Q_VpbIIBYVEg66b6g",
                "width" : 2362
             }
          ],
          "place_id" : "ChIJM9Cswf1v5kcRR4V1SM3UA3I",
          "plus_code" : {
             "compound_code" : "V75M+GJ Paris, France",
             "global_code" : "8FW4V75M+GJ"
          },
          "rating" : 4.5,
          "reference" : "ChIJM9Cswf1v5kcRR4V1SM3UA3I",
          "scope" : "GOOGLE",
          "types" : [ "lodging", "restaurant", "food", "point_of_interest", "establishment" ],
          "user_ratings_total" : 257,
          "vicinity" : "6 Rue de la Tour, Paris"
       },
       {
          "business_status" : "OPERATIONAL",
          "geometry" : {
             "location" : {
                "lat" : 48.85051,
                "lng" : 2.288770099999999
             },
             "viewport" : {
                "northeast" : {
                   "lat" : 48.8518406302915,
                   "lng" : 2.290169480291502
                },
                "southwest" : {
                   "lat" : 48.84914266970851,
                   "lng" : 2.287471519708498
                }
             }
          },
          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
          "name" : "Campanile Paris 15 - Tour Eiffel",
          "photos" : [
             {
                "height" : 4608,
                "html_attributions" : [
                   "\u003ca href=\"https://maps.google.com/maps/contrib/116888857904445171825\"\u003eAndries Basson\u003c/a\u003e"
                ],
                "photo_reference" : "CmRaAAAAMvCBhQQmiMG1nF1xCY6DCVCflH_Zk8KhV1MMWCB8CadGrUR3KnZoeTSTOCm0T0ssDaaNXSSaGoUVSnK0y4vGP8qvH42wV_Xb7ChfCHnHMvHtiOn9jEDzfIjk4WNwttZNEhD4FzWeT_AtfkXoaPZb7VHGGhT0oT3ye4ddD1yPKQe_sn05gO1xFw",
                "width" : 3456
             }
          ],
          "place_id" : "ChIJw3o-Oxtw5kcRA4YML64zIEo",
          "plus_code" : {
             "compound_code" : "V72Q+6G Paris, France",
             "global_code" : "8FW4V72Q+6G"
          },
          "rating" : 3.2,
          "reference" : "ChIJw3o-Oxtw5kcRA4YML64zIEo",
          "scope" : "GOOGLE",
          "types" : [ "lodging", "restaurant", "food", "point_of_interest", "establishment" ],
          "user_ratings_total" : 795,
          "vicinity" : "30 Rue Saint Charles, Paris"
       },
       {
          "business_status" : "OPERATIONAL",
          "geometry" : {
             "location" : {
                "lat" : 48.86401059999999,
                "lng" : 2.3059374
             },
             "viewport" : {
                "northeast" : {
                   "lat" : 48.8654311302915,
                   "lng" : 2.307220330291502
                },
                "southwest" : {
                   "lat" : 48.8627331697085,
                   "lng" : 2.304522369708498
                }
             }
          },
          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
          "name" : "Bateaux-Mouches",
          "opening_hours" : {
             "open_now" : false
          },
          "photos" : [
             {
                "height" : 1365,
                "html_attributions" : [
                   "\u003ca href=\"https://maps.google.com/maps/contrib/107069847120601133858\"\u003eBateaux-Mouches\u003c/a\u003e"
                ],
                "photo_reference" : "CmRaAAAA0GQ9V0gXAlyRpm9ZGzqryTRy7Vja5JECNdjFqE5jZfXuhxg0tCErACwk3lbl0dLwgGa4MmXfKVOjM-DomN55XAVBQHvDEPCyHdypnvTv7-S7oYYQrKrP-HwKs4b1F_srEhD26X2OTWR033c6QlSHEg6eGhTtkjGWYpPp7ghJROAhTwEdhJbd8w",
                "width" : 2048
             }
          ],
          "place_id" : "ChIJSSjNVtpv5kcR06opbMVDFes",
          "plus_code" : {
             "compound_code" : "V874+J9 Paris, France",
             "global_code" : "8FW4V874+J9"
          },
          "rating" : 4.3,
          "reference" : "ChIJSSjNVtpv5kcR06opbMVDFes",
          "scope" : "GOOGLE",
          "types" : [
             "travel_agency",
             "restaurant",
             "food",
             "point_of_interest",
             "establishment"
          ],
          "user_ratings_total" : 14384,
          "vicinity" : "Port de la Conférence, Paris"
       },
       {
          "business_status" : "OPERATIONAL",
          "geometry" : {
             "location" : {
                "lat" : 48.8687833,
                "lng" : 2.300238900000001
             },
             "viewport" : {
                "northeast" : {
                   "lat" : 48.87014063029149,
                   "lng" : 2.301932480291502
                },
                "southwest" : {
                   "lat" : 48.8674426697085,
                   "lng" : 2.299234519708498
                }
             }
          },
          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
          "name" : "Le Cinq",
          "opening_hours" : {
             "open_now" : false
          },
          "photos" : [
             {
                "height" : 1365,
                "html_attributions" : [
                   "\u003ca href=\"https://maps.google.com/maps/contrib/105313064877930758844\"\u003eLe Cinq\u003c/a\u003e"
                ],
                "photo_reference" : "CmRaAAAALa5nCIQsAV-MyvSk9Hx7Xa9AUWPF7x7dAvuckVpBxk6T5maGdY4KndtnAHa6xND9rFdM6_trIWToJWt16ZA2quaoexe13dlBebZSUCjK_3QY0_LEWRno6773mdNH45pzEhDzDzxvjzf_lPC8UKm72mmBGhTim3vSxiFAkcQcS5oi5nxvLXwLVQ",
                "width" : 2048
             }
          ],
          "place_id" : "ChIJqTQzIehv5kcRaF3hD1SzX5A",
          "plus_code" : {
             "compound_code" : "V892+G3 Paris, France",
             "global_code" : "8FW4V892+G3"
          },
          "price_level" : 4,
          "rating" : 4.6,
          "reference" : "ChIJqTQzIehv5kcRaF3hD1SzX5A",
          "scope" : "GOOGLE",
          "types" : [ "bar", "restaurant", "food", "point_of_interest", "establishment" ],
          "user_ratings_total" : 1157,
          "vicinity" : "31 Avenue George V, Paris"
       },
       {
          "business_status" : "CLOSED_TEMPORARILY",
          "geometry" : {
             "location" : {
                "lat" : 48.8584436,
                "lng" : 2.2942664
             },
             "viewport" : {
                "northeast" : {
                   "lat" : 48.8597860802915,
                   "lng" : 2.295587930291501
                },
                "southwest" : {
                   "lat" : 48.8570881197085,
                   "lng" : 2.292889969708498
                }
             }
          },
          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
          "name" : "58 Tour Eiffel",
          "permanently_closed" : true,
          "photos" : [
             {
                "height" : 3454,
                "html_attributions" : [
                   "\u003ca href=\"https://maps.google.com/maps/contrib/105797248713175067379\"\u003e58 Tour Eiffel Restaurant\u003c/a\u003e"
                ],
                "photo_reference" : "CmRaAAAA233ZJ2PCSW0vsE5XqBO_Trc1XJLUpkGccr1KcrgnOwZSeuZEtN2TXrMFNSOi3vsvwxmSL2B8A9H6cGg1WK-Ok0bDr7dLW_6-uDjc7eL5WI6ZA-QHMnfQ9WCh9CGOybciEhCp5LeFR4l-7Jgo1epjG1PMGhSMW7nnt_FSTGONC4b23mzNJnsVDg",
                "width" : 5182
             }
          ],
          "place_id" : "ChIJLU7jZClu5kcR4HULI7qnIHE",
          "plus_code" : {
             "compound_code" : "V75V+9P Paris, France",
             "global_code" : "8FW4V75V+9P"
          },
          "price_level" : 4,
          "rating" : 3.9,
          "reference" : "ChIJLU7jZClu5kcR4HULI7qnIHE",
          "scope" : "GOOGLE",
          "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
          "user_ratings_total" : 1178,
          "vicinity" : "1er étage Tour Eiffel Champ de Mars, Paris"
       },
       {
          "business_status" : "OPERATIONAL",
          "geometry" : {
             "location" : {
                "lat" : 48.85839199999999,
                "lng" : 2.302569
             },
             "viewport" : {
                "northeast" : {
                   "lat" : 48.8597987802915,
                   "lng" : 2.303864430291502
                },
                "southwest" : {
                   "lat" : 48.85710081970851,
                   "lng" : 2.301166469708498
                }
             }
          },
          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
          "name" : "La Fontaine de Mars",
          "opening_hours" : {
             "open_now" : false
          },
          "photos" : [
             {
                "height" : 4032,
                "html_attributions" : [
                   "\u003ca href=\"https://maps.google.com/maps/contrib/118273413440037189930\"\u003eJean-Jacques Tissot.\u003c/a\u003e"
                ],
                "photo_reference" : "CmRaAAAAHAqpmXjKwZX9wYiZLO3iEEKnw6FKr889nry90JXZRS2nc_yL1nPj8wjM7i3nvt6Rm3FBbbRTAFgp5VP3PT8ctYcAiA_cBwb5sUEoliZrGQhNPdnLOUeZYVpZi0v3-1aJEhDZB1AqlKcxzhl8oK1dlkpRGhRVSanp16r0PwDFVF8n4-wl0L7Q_w",
                "width" : 3024
             }
          ],
          "place_id" : "ChIJ_dBPoN9v5kcRt2CYxV1xzrM",
          "plus_code" : {
             "compound_code" : "V853+92 Paris, France",
             "global_code" : "8FW4V853+92"
          },
          "price_level" : 3,
          "rating" : 4.4,
          "reference" : "ChIJ_dBPoN9v5kcRt2CYxV1xzrM",
          "scope" : "GOOGLE",
          "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
          "user_ratings_total" : 1011,
          "vicinity" : "129 Rue Saint-Dominique, Paris"
       },
       {
          "business_status" : "OPERATIONAL",
          "geometry" : {
             "location" : {
                "lat" : 48.8597648,
                "lng" : 2.3086685
             },
             "viewport" : {
                "northeast" : {
                   "lat" : 48.8611268302915,
                   "lng" : 2.309985830291502
                },
                "southwest" : {
                   "lat" : 48.8584288697085,
                   "lng" : 2.307287869708498
                }
             }
          },
          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
          "name" : "Hôtel Brasserie Thoumieux",
          "opening_hours" : {
             "open_now" : false
          },
          "photos" : [
             {
                "height" : 1492,
                "html_attributions" : [
                   "\u003ca href=\"https://maps.google.com/maps/contrib/115129917696448067905\"\u003eHôtel Brasserie Thoumieux\u003c/a\u003e"
                ],
                "photo_reference" : "CmRaAAAA1svjc9MfBQfbf4t_nuAdMJQtNquK259BOmvtiVgHp1IJj_ysljvjOg_AdMIyO-gjYMdqqdOAlkP5u58J4pHaUKic3AL42_2S0pXFpJ3Sh7x6ySXFeYW9Pou_oDmOQmSJEhBb1V9P7iTFdkY9rdGPIIArGhScPzhDepR21FKE_Ealh0VTrAnSJw",
                "width" : 995
             }
          ],
          "place_id" : "ChIJmf7lrNlv5kcR7TiGblf1J4w",
          "plus_code" : {
             "compound_code" : "V855+WF Paris, France",
             "global_code" : "8FW4V855+WF"
          },
          "price_level" : 3,
          "rating" : 4.1,
          "reference" : "ChIJmf7lrNlv5kcR7TiGblf1J4w",
          "scope" : "GOOGLE",
          "types" : [ "restaurant", "lodging", "food", "point_of_interest", "establishment" ],
          "user_ratings_total" : 300,
          "vicinity" : "79 Rue Saint-Dominique, Paris"
       },
       {
          "business_status" : "OPERATIONAL",
          "geometry" : {
             "location" : {
                "lat" : 48.8581164,
                "lng" : 2.3015935
             },
             "viewport" : {
                "northeast" : {
                   "lat" : 48.8594921802915,
                   "lng" : 2.302919680291502
                },
                "southwest" : {
                   "lat" : 48.8567942197085,
                   "lng" : 2.300221719708498
                }
             }
          },
          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png",
          "name" : "Constant Cafe",
          "opening_hours" : {
             "open_now" : false
          },
          "photos" : [
             {
                "height" : 2000,
                "html_attributions" : [
                   "\u003ca href=\"https://maps.google.com/maps/contrib/108341021043069390972\"\u003eCafé Constant\u003c/a\u003e"
                ],
                "photo_reference" : "CmRaAAAAh8x6Wymca5gXMQAVACBL7wMIrNEg4PEVenb3gQ2pduSHp8zEB0vAFN9gmUmK2X5dtIMFhTAaS8i-SrPztY_Y5X8A-9rt3PLhpKHfBNY2s-9Djzz2Cht9t3nMYUJQxdb5EhBVVrwLpKTT1z7un6C0j_nmGhRz5gWG0ljeU_RINSPGrzSNiKEJ4A",
                "width" : 3008
             }
          ],
          "place_id" : "ChIJbZG9lt9v5kcRwdXbp2Et1B8",
          "plus_code" : {
             "compound_code" : "V852+6J Paris, France",
             "global_code" : "8FW4V852+6J"
          },
          "price_level" : 2,
          "rating" : 4.1,
          "reference" : "ChIJbZG9lt9v5kcRwdXbp2Et1B8",
          "scope" : "GOOGLE",
          "types" : [ "cafe", "restaurant", "food", "point_of_interest", "establishment" ],
          "user_ratings_total" : 1912,
          "vicinity" : "139 Rue Saint-Dominique, Paris"
       },
       {
          "business_status" : "OPERATIONAL",
          "geometry" : {
             "location" : {
                "lat" : 48.8662944,
                "lng" : 2.3044222
             },
             "viewport" : {
                "northeast" : {
                   "lat" : 48.86760178029149,
                   "lng" : 2.305818080291502
                },
                "southwest" : {
                   "lat" : 48.8649038197085,
                   "lng" : 2.303120119708498
                }
             }
          },
          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
          "name" : "Les Petits Déjeuners du Plaza Athénée",
          "opening_hours" : {
             "open_now" : false
          },
          "photos" : [
             {
                "height" : 748,
                "html_attributions" : [
                   "\u003ca href=\"https://maps.google.com/maps/contrib/117989054969582146973\"\u003eLes Petits Déjeuners du Plaza Athénée\u003c/a\u003e"
                ],
                "photo_reference" : "CmRaAAAAHJmXdfuiA753TkA_hkWmq13_wBm4JJ0yP2rsm4eoxeUdd5d3c5NvIaPNiwEJCrzcA_WqSlkr2qKL246GsWT26tFF_I81X0cNVXQLFciuD8KQKIraJSOxTcM1UBCY0MAWEhDq53CvRuQrFjeMPhtmN5jEGhT4adGRQenlLZMlFr8Slqf_NQreUQ",
                "width" : 688
             }
          ],
          "place_id" : "ChIJnZ0Kxdxv5kcRwiKiT3DJNAw",
          "plus_code" : {
             "compound_code" : "V883+GQ Paris, France",
             "global_code" : "8FW4V883+GQ"
          },
          "rating" : 4.7,
          "reference" : "ChIJnZ0Kxdxv5kcRwiKiT3DJNAw",
          "scope" : "GOOGLE",
          "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
          "user_ratings_total" : 1667,
          "vicinity" : "25 Avenue Montaigne, Paris"
       },
       {
          "business_status" : "OPERATIONAL",
          "geometry" : {
             "location" : {
                "lat" : 48.858173,
                "lng" : 2.301848
             },
             "viewport" : {
                "northeast" : {
                   "lat" : 48.8595632802915,
                   "lng" : 2.303161880291502
                },
                "southwest" : {
                   "lat" : 48.8568653197085,
                   "lng" : 2.300463919708498
                }
             }
          },
          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
          "name" : "Les Cocottes",
          "opening_hours" : {
             "open_now" : false
          },
          "photos" : [
             {
                "height" : 2704,
                "html_attributions" : [
                   "\u003ca href=\"https://maps.google.com/maps/contrib/108730981906271370288\"\u003eLes Cocottes\u003c/a\u003e"
                ],
                "photo_reference" : "CmRaAAAA8yKcExru3uJd9oUV1BlioIPkHq50o3MxNfEhez9YcOAJ-y0SM0z7bymR-QNT6qyL7Z1c-CAnvfuOiqafndEXTSsdGjwpLRPBjKx6RQCuvu8DHdDP203U59qCsmiT0S5BEhBmtqG706mEzQCOdsygCuo2GhT6Atk5pnFGwvu70mA7ArQ6zRsifw",
                "width" : 3176
             }
          ],
          "place_id" : "ChIJU5JgmN9v5kcRPHf9BJWJqZs",
          "plus_code" : {
             "compound_code" : "V852+7P Paris, France",
             "global_code" : "8FW4V852+7P"
          },
          "price_level" : 2,
          "rating" : 4.2,
          "reference" : "ChIJU5JgmN9v5kcRPHf9BJWJqZs",
          "scope" : "GOOGLE",
          "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
          "user_ratings_total" : 1276,
          "vicinity" : "135 Rue Saint-Dominique, Paris"
       },
       {
          "business_status" : "OPERATIONAL",
          "geometry" : {
             "location" : {
                "lat" : 48.8694964,
                "lng" : 2.2965084
             },
             "viewport" : {
                "northeast" : {
                   "lat" : 48.87088023029149,
                   "lng" : 2.297905630291502
                },
                "southwest" : {
                   "lat" : 48.86818226970849,
                   "lng" : 2.295207669708498
                }
             }
          },
          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
          "name" : "Le Speakeasy",
          "opening_hours" : {
             "open_now" : false
          },
          "photos" : [
             {
                "height" : 3606,
                "html_attributions" : [
                   "\u003ca href=\"https://maps.google.com/maps/contrib/105857578366048968398\"\u003eLe Speakeasy\u003c/a\u003e"
                ],
                "photo_reference" : "CmRaAAAAUklupG8IVulsHTiROeTxlYjrSTTUE7epVaGZwQ9gc4VDgM_1_9XHCV-CjDnkIES7CE001uxuY85kYWCugJ7X3pPV_DrC2c2Rkn2foHSWNezk1qq4UDnoJDgXMA4czPglEhDoLqdQWWePz0s6Ngcx99a_GhT15IzT48sAS8T26eEMbhp3DwPXzg",
                "width" : 5412
             }
          ],
          "place_id" : "ChIJVYQc4ehv5kcRxAmY5t4c54k",
          "plus_code" : {
             "compound_code" : "V79W+QJ Paris, France",
             "global_code" : "8FW4V79W+QJ"
          },
          "price_level" : 3,
          "rating" : 4,
          "reference" : "ChIJVYQc4ehv5kcRxAmY5t4c54k",
          "scope" : "GOOGLE",
          "types" : [
             "night_club",
             "bar",
             "restaurant",
             "food",
             "point_of_interest",
             "establishment"
          ],
          "user_ratings_total" : 728,
          "vicinity" : "25 Rue Jean Giraudoux, Paris"
       },
       {
          "business_status" : "OPERATIONAL",
          "geometry" : {
             "location" : {
                "lat" : 48.8681387,
                "lng" : 2.3027911
             },
             "viewport" : {
                "northeast" : {
                   "lat" : 48.86945178029149,
                   "lng" : 2.304205580291502
                },
                "southwest" : {
                   "lat" : 48.86675381970849,
                   "lng" : 2.301507619708498
                }
             }
          },
          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
          "name" : "Le Relais de l’Entrecôte",
          "opening_hours" : {
             "open_now" : false
          },
          "photos" : [
             {
                "height" : 591,
                "html_attributions" : [
                   "\u003ca href=\"https://maps.google.com/maps/contrib/111340913932445019981\"\u003eLe Relais de l&#39;Entrecôte\u003c/a\u003e"
                ],
                "photo_reference" : "CmRaAAAArCfiBwHULJ8GfTV3KeLl9FIWBhLjAea5Wv7_SizpRAczpe1NIUPg89GAAqUBCzAJJuWEYfX-BNuixjWbIb5kNUxdtZ-SfyElAGyzSxflSpLfSyPxJwoCLvONW9Z-Jp7vEhDRbDr7dQ20me4KownCoC_9GhSrydzbb2upqCtlL0_-QssrFLGYTw",
                "width" : 886
             }
          ],
          "place_id" : "ChIJqeYv3MJv5kcR2PpHs5RdJEg",
          "plus_code" : {
             "compound_code" : "V893+74 Paris, France",
             "global_code" : "8FW4V893+74"
          },
          "price_level" : 2,
          "rating" : 4.1,
          "reference" : "ChIJqeYv3MJv5kcR2PpHs5RdJEg",
          "scope" : "GOOGLE",
          "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
          "user_ratings_total" : 3156,
          "vicinity" : "15 Rue Marbeuf, Paris"
       },
       {
          "business_status" : "OPERATIONAL",
          "geometry" : {
             "location" : {
                "lat" : 48.8640824,
                "lng" : 2.299039699999999
             },
             "viewport" : {
                "northeast" : {
                   "lat" : 48.8653760302915,
                   "lng" : 2.300414330291502
                },
                "southwest" : {
                   "lat" : 48.8626780697085,
                   "lng" : 2.297716369708498
                }
             }
          },
          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
          "name" : "Antoine.",
          "opening_hours" : {
             "open_now" : false
          },
          "photos" : [
             {
                "height" : 3024,
                "html_attributions" : [
                   "\u003ca href=\"https://maps.google.com/maps/contrib/104747076090036922024\"\u003eLydia Lin\u003c/a\u003e"
                ],
                "photo_reference" : "CmRaAAAAYrffn7Bnnw2CdR2d46zYidJs9DR3r81ioDd5xrY0rm7n3eKEMk2olWTHCmriygw7uJwq-48cPAKUKh0NPGoJSKZgf5-D2QXeIeIYxlqTCFp4ipIYms0p7xYp-JtAfYOmEhDspkYzwX5M-eKBvV3PD4HSGhR1LjBT4i_ZSO0zLP07CoakF1oRZg",
                "width" : 4032
             }
          ],
          "place_id" : "ChIJ-funbedv5kcRkKp2JlbfsNM",
          "plus_code" : {
             "compound_code" : "V77X+JJ Paris, France",
             "global_code" : "8FW4V77X+JJ"
          },
          "price_level" : 3,
          "rating" : 4.5,
          "reference" : "ChIJ-funbedv5kcRkKp2JlbfsNM",
          "scope" : "GOOGLE",
          "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
          "user_ratings_total" : 183,
          "vicinity" : "10 Avenue de New York, Paris"
       },
       {
          "business_status" : "OPERATIONAL",
          "geometry" : {
             "location" : {
                "lat" : 48.85837839999999,
                "lng" : 2.287571299999999
             },
             "viewport" : {
                "northeast" : {
                   "lat" : 48.85970553029149,
                   "lng" : 2.288874580291501
                },
                "southwest" : {
                   "lat" : 48.8570075697085,
                   "lng" : 2.286176619708498
                }
             }
          },
          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
          "name" : "Astrance",
          "opening_hours" : {
             "open_now" : false
          },
          "photos" : [
             {
                "height" : 1365,
                "html_attributions" : [
                   "\u003ca href=\"https://maps.google.com/maps/contrib/105303505373661530610\"\u003eindoorfish\u003c/a\u003e"
                ],
                "photo_reference" : "CmRaAAAAXC-fcvcEdZssNW0BEAdQ0U3m9944jPEQVGuc2VNWmPEOxllZmY25FnG16Z-pwhROsXsox_a55xSbyM33YJuX7XFYWYyQ9hQyh--zsx1ghP4gugwwv2ckq_Z2LUiBJBfkEhAl2rIHbWvd6eg4AWP-g4LIGhSuUL3T9_xu4TlT2gtgg34mGobaXg",
                "width" : 2048
             }
          ],
          "place_id" : "ChIJ_QxhRv1v5kcRyxeqcySoeBQ",
          "plus_code" : {
             "compound_code" : "V75Q+92 Paris, France",
             "global_code" : "8FW4V75Q+92"
          },
          "price_level" : 4,
          "rating" : 4.5,
          "reference" : "ChIJ_QxhRv1v5kcRyxeqcySoeBQ",
          "scope" : "GOOGLE",
          "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
          "user_ratings_total" : 295,
          "vicinity" : "4 Rue Beethoven, Paris"
       },
       {
          "business_status" : "OPERATIONAL",
          "geometry" : {
             "location" : {
                "lat" : 48.8598392,
                "lng" : 2.3003363
             },
             "viewport" : {
                "northeast" : {
                   "lat" : 48.8611597302915,
                   "lng" : 2.301698880291502
                },
                "southwest" : {
                   "lat" : 48.85846176970851,
                   "lng" : 2.299000919708498
                }
             }
          },
          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
          "name" : "Il Sorrentino",
          "opening_hours" : {
             "open_now" : false
          },
          "photos" : [
             {
                "height" : 3456,
                "html_attributions" : [
                   "\u003ca href=\"https://maps.google.com/maps/contrib/106894280284018607172\"\u003eMark Hallman\u003c/a\u003e"
                ],
                "photo_reference" : "CmRaAAAAJXJLKFBudpTpPouen4-iYYxt-Ifw98jE_2XhCq7Zba2-3ETrNP0N_kYnsPo6VIy3dVZzCsi6Ywr43J2qdVWKUN80ulDz8RQyHQxtnh20sw7kgd5-pSr0g6CiEkH5Zy3nEhCzdmvDTs7k3RC5IbBA9xUZGhQoavLpAjHAn9UcQ0qCA5VMk7SfPg",
                "width" : 4608
             }
          ],
          "place_id" : "ChIJrbqjLd5v5kcR63t3kq-uYts",
          "plus_code" : {
             "compound_code" : "V852+W4 Paris, France",
             "global_code" : "8FW4V852+W4"
          },
          "price_level" : 3,
          "rating" : 4.5,
          "reference" : "ChIJrbqjLd5v5kcR63t3kq-uYts",
          "scope" : "GOOGLE",
          "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
          "user_ratings_total" : 468,
          "vicinity" : "4 Rue de Monttessuy, Paris"
       }
    ],
    "status" : "OK"
}

export type Establishment = typeof response.results[0]