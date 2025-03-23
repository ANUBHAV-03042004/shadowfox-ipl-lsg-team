const dc_squad = [
    { member_name: "Axar Patel", match: 150, runs: 1653, bat_avg: 21.46, wickets: 123, e_r: 7.27 },
    { member_name: "Faf du Plessis", match: 145, runs: 4571, bat_avg: 35.99, wickets: 0, e_r: 16.00 },
    { member_name: "KL Rahul", match: 132, runs: 4683, bat_avg: 45.46, wickets: 0, e_r: 0.0 },
    { member_name: "Mohit Sharma", match: 112, runs: 124, bat_avg: 7.29, wickets: 132, e_r: 8.67 },
    { member_name: "Kuldeep Yadav", match: 84, runs: 183, bat_avg: 15.25, wickets: 87, e_r: 8.20 },
    { member_name: "Karun Nair", match: 76, runs: 1496, bat_avg: 23.74, wickets: 0, e_r: 0.0 },
    { member_name: "T Natarajan", match: 61, runs: 3, bat_avg: 0, wickets: 67, e_r: 8.83 },
    { member_name: "Mitchell Starc", match: 41, runs: 105, bat_avg: 11.66, wickets: 51, e_r: 8.20 },
    { member_name: "Mukesh Kumar", match: 20, runs: 10, bat_avg: 10, wickets: 24, e_r: 10.43 },
    { member_name: "Tristan Stubbs", match: 18, runs: 405, bat_avg: 36.81, wickets: 4, e_r: 7.25 },
    { member_name: "Abishek Porel", match: 18, runs: 360, bat_avg: 25.71, wickets: 0, e_r: 0.0 },
    { member_name: "Dushmantha Chameera", match: 13, runs: 43, bat_avg: 10.75, wickets: 9, e_r: 9.19 },
    { member_name: "Harry Brook", match: 11, runs: 190, bat_avg: 21.11, wickets: 0, e_r: 0.0 },
    { member_name: "Ashutosh Sharma", match: 11, runs: 189, bat_avg: 27, wickets: 0, e_r: 0.0 },
    { member_name: "Jake Fraser-McGurk", match: 9, runs: 330, bat_avg: 36.66, wickets: 0, e_r: 0.0 },
    { member_name: "Sameer Rizvi", match: 8, runs: 51, bat_avg: 12.75, wickets: 0, e_r: 0.0 },
    { member_name: "Darshan Nalkande", match: 6, runs: 12, bat_avg: 6, wickets: 6, e_r: 10.57 },
    { member_name: "Donovan Ferreira", match: 2, runs: 8, bat_avg: 4, wickets: 0, e_r: 0.0 },
    { member_name: "Ajay Mandal", match: 0, runs: 0, bat_avg: 0, wickets: 0, e_r: 0.0 },
    { member_name: "Vipraj Nigam", match: 0, runs: 0, bat_avg: 0, wickets: 0, e_r: 0.0 },
    { member_name: "Tripurana Vijay", match: 0, runs: 0, bat_avg: 0, wickets: 0, e_r: 0.0 },
    { member_name: "Manvanth Kumar", match: 0, runs: 0, bat_avg: 0, wickets: 0, e_r: 0.0 },
    { member_name: "Madhav Tiwari", match: 0, runs: 0, bat_avg: 0, wickets: 0, e_r: 0.0 },
    { member_name: "David Miller", match: 130, runs: 2924, bat_avg: 36.09, wickets: 0, e_r: 0.0 },
    { member_name: "Rishabh Pant", match: 111, runs: 3284, bat_avg: 35.31, wickets: 0, e_r: 0.0 },
    {member_name: "Nicholas Pooran",match: 76, runs: 1769, bat_avg: 32.16, wickets: 0, e_r: 0.0 },
    { member_name: "Ravi Bishnoi", match: 66, runs: 32, bat_avg: 4, wickets: 63, e_r: 7.80 },
    { member_name: "Avesh Khan",match: 63, runs: 41,bat_avg: 20.50, wickets: 74, e_r: 8.87 },
    { member_name: "Shahbaz Ahmed", match: 55, runs: 536, bat_avg: 19.14, wickets: 21, e_r: 9.35 },
    { member_name: "Abdul Samad",match: 50, runs: 577, bat_avg: 19.23, wickets: 2, e_r: 12.55 },
    { member_name: "Aiden Markram",match: 44, runs: 995, bat_avg: 30.15, wickets: 2, e_r: 8.52 },
    { member_name: "Mitchell Marsh", match: 42, runs: 665, bat_avg: 19.55, wickets: 37, e_r: 8.51 },
    { member_name: "Ayush Badoni", match: 42, runs: 634,bat_avg: 24.38, wickets: 2, e_r: 8.64 },
    { member_name: "Mohsin Khan", match: 24, runs: 25, bat_avg: 8.33, wickets: 27, e_r: 8.50 },
    { member_name: "Akash Singh",match: 8, runs: 0, bat_avg: 0, wickets: 5, e_r: 9.86 },
    { member_name: "Akash Deep", match: 8, runs: 19, bat_avg: 9.50, wickets: 7, e_r: 11.67 },
    { member_name: "Mayank Yadav",match: 4, runs: 0,bat_avg: 0, wickets: 7, e_r: 6.98 },
    { member_name: "M Siddharth", match: 3, runs: 0, bat_avg: 0, wickets: 1, e_r: 7.88 },
    { member_name: "Rajvardhan Hangargekar", match: 2, runs: 0, bat_avg: 0, wickets: 3, e_r: 10.00 },
    { member_name: "Arshin Kulkarni", match: 2, runs: 9, bat_avg: 4.50, wickets: 0,e_r: 0.0 },
    { member_name: "Shamar Joseph", match: 1, runs: 0, bat_avg: 0, wickets: 0, e_r: 11.75 },
    { member_name: "Himmat Singh", match: 0, runs: 0, bat_avg: 0, wickets: 0, e_r: 0.0 },
    { member_name: "Matthew Breetzke", match: 0, runs: 0, bat_avg: 0, wickets: 0, e_r: 0.0 },
    { member_name: "Aryan Juyal", match: 0, runs: 0, bat_avg: 0, wickets: 0, e_r: 0.0 },
    { member_name: "Yuvraj Chaudhary", match: 0, runs: 0, bat_avg: 0, wickets: 0, e_r: 0.0 },
    { member_name: "Prince Yadav", match: 0, runs: 0, bat_avg: 0, wickets: 0, e_r: 0.0 },
    { member_name: "Digvesh Singh", match: 0, runs: 0, bat_avg: 0, wickets: 0, e_r: 0.0 },
    { member_name: "Ajinkya Rahane", match: 185, runs: 4642, bat_avg: 30.14, wickets: 1, e_r: 5.00 },
    { member_name: "Sunil Narine", match: 177, runs: 1534, bat_avg: 17.04, wickets: 180, e_r: 6.73 },
    { member_name: "Manish Pandey", match: 172, runs: 3850, bat_avg: 29.16, wickets: 0, e_r: 0.0 },
    { member_name: "Andre Russell", match: 127, runs: 2484, bat_avg: 29.22, wickets: 115, e_r: 9.35 },
    { member_name: "Quinton de Kock", match: 107, runs: 3157, bat_avg: 31.25, wickets: 0, e_r: 0.0 },
    { member_name: "Varun Chakaravarthy", match: 71, runs: 25, bat_avg: 6.25, wickets: 83, e_r: 7.56 },
    { member_name: "Moeen Ali", match: 67, runs: 1162, bat_avg: 22.78, wickets: 35, e_r: 7.06 },
    { member_name: "Venkatesh Iyer", match: 51, runs: 1326, bat_avg: 31.57, wickets: 3, e_r: 10.59 },
    { member_name: "Anrich Nortje", match: 46, runs: 49, bat_avg: 8.16, wickets: 60, e_r: 8.96 },
    { member_name: "Rinku Singh", match: 46, runs: 893, bat_avg: 30.79, wickets: 0, e_r: 0.0 },
    { member_name: "Mayank Markande", match: 37, runs: 48, bat_avg: 16, wickets: 37, e_r: 8.90 },
    { member_name: "Rovman Powell", match: 27, runs: 360, bat_avg: 18.94, wickets: 1, e_r: 11.66 },
    { member_name: "Umran Malik", match: 26, runs: 23, bat_avg: 11.50, wickets: 29, e_r: 9.39 },
    { member_name: "Vaibhav Arora", match: 21, runs: 9, bat_avg: 4.50, wickets: 19, e_r: 9.18 },
    { member_name: "Harshit Rana", match: 21, runs: 2, bat_avg: 1, wickets: 25, e_r: 9.05 },
    { member_name: "Ramandeep Singh", match: 20, runs: 170, bat_avg: 28.33, wickets: 6, e_r: 9.45 },
    { member_name: "Rahmanullah Gurbaz", match: 14, runs: 289, bat_avg: 22.23, wickets: 0, e_r: 0.0 },
    { member_name: "Anukul Roy", match: 11, runs: 26, bat_avg: 8.66, wickets: 5, e_r: 8.42 },
    { member_name: "Angkrish Raghuvanshi", match: 10, runs: 163, bat_avg: 23.28, wickets: 0, e_r: 0.0 },
    { member_name: "Spencer Johnson", match: 5, runs: 6, bat_avg: 0, wickets: 4, e_r: 9.43 },
    { member_name: "Luvnith Sisodia", match: 0, runs: 0, bat_avg: 0, wickets: 0, e_r: 0.0 },
    { member_name: "Rashid Khan", match: 121, runs: 545, bat_avg: 14.72, wickets: 149, e_r: 6.82 },
    { member_name: "Ishant Sharma", match: 110, runs: 57, bat_avg: 9.50, wickets: 92, e_r: 8.24 },
    { member_name: "Jos Buttler", match: 107, runs: 3582, bat_avg: 38.10, wickets: 0, e_r: 0.0 },
    { member_name: "Shubman Gill", match: 103, runs: 3216, bat_avg: 37.83, wickets: 0, e_r: 0.0 },
    { member_name: "Rahul Tewatia", match: 93, runs: 1013, bat_avg: 25.32, wickets: 32, e_r: 7.90 },
    { member_name: "Mohammed Siraj", match: 93, runs: 109, bat_avg: 10.90, wickets: 93, e_r: 8.64 },
    { member_name: "Kagiso Rabada", match: 80, runs: 206, bat_avg: 12.11, wickets: 117, e_r: 8.48 },
    { member_name: "Washington Sundar", match: 60, runs: 378, bat_avg: 13.50, wickets: 37, e_r: 7.54 },
    { member_name: "Prasidh Krishna", match: 51, runs: 9, bat_avg: 3, wickets: 49, e_r: 8.92 },
    { member_name: "Shahrukh Khan", match: 40, runs: 553, bat_avg: 19.75, wickets: 0, e_r: 7.50 },
    { member_name: "Mahipal Lomror", match: 40, runs: 527, bat_avg: 18.17, wickets: 1, e_r: 8.46 },
    { member_name: "Sai Sudharsan", match: 25, runs: 1034, bat_avg: 47, wickets: 0, e_r: 0.0 },
    { member_name: "Anuj Rawat", match: 24, runs: 318, bat_avg: 19.87, wickets: 0, e_r: 0.0 },
    { member_name: "Jayant Yadav", match: 20, runs: 40, bat_avg: 10, wickets: 8, e_r: 6.84 },
    { member_name: "Sherfane Rutherford", match: 11, runs: 106, bat_avg: 15.14, wickets: 1, e_r: 8.63 },
    { member_name: "Sai Kishore", match: 10, runs: 13, bat_avg: 13, wickets: 13, e_r: 8.32 },
    { member_name: "Gerald Coetzee", match: 10, runs: 14, bat_avg: 3.50, wickets: 13, e_r: 10.17 },
    { member_name: "Arshad Khan", match: 10, runs: 101, bat_avg: 25.25, wickets: 6, e_r: 12.49 },
    { member_name: "Glenn Phillips", match: 8, runs: 65, bat_avg: 9.28, wickets: 2, e_r: 8.00 },
    { member_name: "Kulwant Khejroliya", match: 7, runs: 0, bat_avg: 0, wickets: 5, e_r: 10.76 },
    { member_name: "Kumar Kushagra", match: 4, runs: 3, bat_avg: 1, wickets: 0, e_r: 0.0 },
    { member_name: "Manav Suthar", match: 1, runs: 1, bat_avg: 1, wickets: 0, e_r: 13.00 },
    { member_name: "Gurnoor Brar", match: 1, runs: 0, bat_avg: 0, wickets: 0, e_r: 14.00 },
    { member_name: "Karim Janat", match: 0, runs: 0, bat_avg: 0, wickets: 0, e_r: 0.0 },
    { member_name: "Nishant Sindhu", match: 0, runs: 0, bat_avg: 0, wickets: 0, e_r: 0.0 }
];

// module.exports = dc_squad;
module.exports = dc_squad; 
