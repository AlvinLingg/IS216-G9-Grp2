# ✨ NOM.NOM ✨
This project was developed by G9-T2 as part of the requirements for IS216.
* TAN Boon Yeow - bytan.2021
* Sebastian ONG Chin Poh - cpong.2021
* Alvin LING Wei Chow - alvin.ling.2021
* Timothy TAY Wee Tin - timothy.tay.2021  

Website is deployed on Vercel: https://wad2-nomnom.vercel.app/

## Overview
### Background
Singaporeans are obsessed with food– it is not uncommon to see people waiting in line for hours to get ahold of their favourite dishes. However, a lesser-known fact is that food wastage remains as one of the pressing issues the city-state needs to address to improve food security and reduce its carbon footprint. In 2021, Singapore generated about 817,000 tonnes of food waste and this represents an increase of 22% from 665,000 tonnes in the previous year (Lin, 2022). The rising trend in food wastage will place further pressure on our scarce resources (e.g., having to use more land to build waste facilities to accommodate needs) and this will not be sustainable in the long-term. As part of a community-driven effort to drive awareness and reduce food waste at the household level, our team has developed NOM.NOM.

### Solution
NOM.NOM is a recipe-sharing website that allows users to search recipes based on ingredients they have at home. Through NOM.NOM, we aim to reduce food waste produced in households by curating a list of recipes that can help users bring a new life to their ingredients. We also hope to foster connections between like-minded individuals by providing a platform to create, share, and discuss new recipes.

![image](https://user-images.githubusercontent.com/9499796/201511716-8cf59237-52a6-489b-a26c-2bb20e1c4b06.png)


### Key Functionalities
1. Recipe searching tool

    Users can find recipes based on ingredients they have on hand according to filters specified (e.g., cuisine preferences).

2. Recipes of the day

    Random recipes will be featured in the front page of the website

3. Popular recipes

    Recipes with the largest like ratios and views, etc, will be featured in the front page of the website.

4. Create and share recipes
    
    Users can create and share their favourite recipes with friends and family on social media websites.

5. Review recipes
    
    Users to interact with one another through rating, liking and commenting on the recipe at the comments section. 


## Solution Architecture
![image](https://user-images.githubusercontent.com/9499796/201516838-165f9d2b-fb1c-472c-a5e0-259a5198dc5a.png)

## Project Installation
1. Clone the repository

2. Open command prompt and change directory

    `cd IS216-G9-Grp2`
    
3. Install dependencies

    `npm install`

4. Create .env at root folder
    ```
    DB_ACCESS_KEY_ID=AKIA3LN6P45OGX2YRCMU
    DB_SECRET_ACCESS_KEY=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
    MAGIC_PUBLISHABLE_KEY=pk_live_7EE7CFCDC193E64B
    JWT_ACCESS_TOKEN_SECRET=bcf5ee784917dd2ded89fa0a09363fc96e7a67c9b118bbbf44eb1091d3a50264fac416d18a92fa664b886d29e839919a3ea2706bdf755d6f659d4eb4cd67e54b
    JWT_REFRESH_TOKEN_SECRET=c37c7093c6682fb5ee886d68cc873d83d2318371f4dcff8292dba27717470686d23fe2c73c470e9b6262f8d04eb4a1a3ba3dda7109e1e4276bbcab59daaf75f3
    ```

5. Run local development server

    `npm run dev`
    
## References
Lin, C. (2022, April 22). - https://www.channelnewsasia.com/singapore/rice-and-climate-crisis-significance-reducing-food-waste-climate-change-hits-rice-production-2572866 
