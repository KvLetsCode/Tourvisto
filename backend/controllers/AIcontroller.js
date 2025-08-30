// import main from "../config/Gemini.js";
import Data from "../Models/Data.js";
import main from "../config/opneai.js";

export const AIdataPost = async (req, res) => {
  try {
      const { country, duration, travelStyles, interest, budget, groupType } = req.body;
      
    const prompt = `Generate a ${duration}-day travel itinerary for ${country} based on the following user information:
        Budget: '${budget}'
        Interests: '${interest}'
        TravelStyle: '${travelStyles}'
        GroupType: '${groupType}'
        Return the itinerary and lowest estimated price in a clean, non-markdown JSON format with the following structure:
        {
        "name": "A descriptive title for the trip",
        "description": "A brief description of the trip and its highlights not exceeding 100 words",
        "estimatedPrice": "Lowest average price for the trip in USD, e.g.$price",
        "duration": ${duration},
        "budget": "${budget}",
        "travelStyle": "${travelStyles}",
        "country": "${country}",
        "interests": ${interest},
        "groupType": "${groupType}",
        "bestTimeToVisit": [
        '🌸 Season (from month to month): reason to visit',
        '☀️ Season (from month to month): reason to visit',
        '🍁 Season (from month to month): reason to visit',
        '❄️ Season (from month to month): reason to visit'
        ],
        "weatherInfo": [
        '☀️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
        '🌦️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
        '🌧️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
        '❄️ Season: temperature range in Celsius (temperature range in Fahrenheit)'
        ],
        "location": {
        "city": "name of the city or region",
        "coordinates": [latitude, longitude],
        "openStreetMap": "link to open street map"
        },
        "itinerary": [
        {
        "day": 1,
        "location": "City/Region Name",
        "activities": [
            {"time": "Morning", "description": "🏰 Visit the local historic castle and enjoy a scenic walk"},
            {"time": "Afternoon", "description": "🖼️ Explore a famous art museum with a guided tour"},
            {"time": "Evening", "description": "🍷 Dine at a rooftop restaurant with local wine"}
        ]
    },
    ...
    ]
    }`;
      
    const airesponse = await main(prompt)
      
    let parsedInfo;
    try {
      parsedInfo = JSON.parse(airesponse);
    } catch (err) {
      console.error("❌ Gemini did not return valid JSON:", airesponse);
      return res.status(500).json({ success: false, error: "Invalid AI response" });
    }
    
    const unsplashApikey = process.env.UNSPLASH_ACCESS_KEY
    

    const imageResponse = await fetch(
      `https://api.unsplash.com/search/photos?query=${country} ${interest} ${travelStyles}&client_id=${unsplashApikey}`
      );
      
    const imageUrls = (await imageResponse.json()).results
      .slice(0, 3)
      .map((result) => result.urls?.regular || null);

    const result = await Data.create({info: JSON.stringify(parsedInfo),images: imageUrls });

    return res.json({
      success: true,
      id:result?._id
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAidata = async (req,res) => {
    const {id} = req.params
    const data = await Data.findById(id)
    
    if (!data) {
        return res.json({
            success: false,
            message:"Data with this id is not available"
        })
    }

    

    return res.status(200).json({
        success: true,
        data
    })
}

export const getAll = async (req,res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || ''

    const skip = (page - 1)*limit
    const data = await Data.find().limit(limit).skip(skip)
    const total = await Data.countDocuments( )
    if (!data) {
      return res.json({
            success: false,
            message:"Data with this id is not available"
        })
    }

    res.status(200).json({
      success: true,
      data,
      total,
      page,
      pages:Math.ceil(total/limit)
    })
  } catch (error) {
      return res.json({
      success: false,
      message:error
    })
  }
}