// creates the database of the web application 

// import db.js module for mongodb database functions 
const db = require('./models/db.js');

// import UserModel schema 
const User = require('./models/UserModel.js');

// import ItemModel schema 
const Item = require('./models/ItemModel.js');

// import ReviewModel schema
const Review = require('./models/ReviewModel.js');

// for password hashing 
const bcrypt = require('bcrypt');
const saltRounds = 10;

// connect to the database 
db.connect();

// hashed password for all users 
bcrypt.hash("password", saltRounds, function (err, hash) {
	var users = [
		{
			username: 'hackerman',
			password: hash,
			email: 'hackerman@gmail.com',
			displayname: 'Hackerman',
			img: '/public/images/users/Hackerman.jpg',
			firstname: 'Hackeroni',
			lastname: 'McHacks',
			birthdate: '1969-04-20',
			joindate: '2020-03-08',
			favitems: [1, 15, 4],
			owneditems: [
				{ id: 3, purchasedate: '2020-08-16' },
				{ id: 14, purchasedate: '2020-09-10' },
				{ id: 4, purchasedate: '2020-12-14' },
				{ id: 7, purchasedate: '2021-04-01' }
			]
		},
		{
			username: 'notsus',
			password: hash,
			email: 'sus@gmail.com',
			displayname: 'notSus',
			img: '/public/images/users/notSus.jpg',
			firstname: 'Red',
			lastname: 'Amogus',
			birthdate: '2018-05-15',
			joindate: '2021-04-01',
			favitems: [17, 9, 0, 8, 28, 20, 3, 11],
			owneditems: [
				{ id: 13, purchasedate: '2021-04-01' },
				{ id: 1, purchasedate: '2021-04-08' },
				{ id: 24, purchasedate: '2021-04-10' }
			]
		},
		{
			username: 'boukendabouken',
			password: hash,
			email: 'bouken@gmail.com',
			displayname: 'BoukenDaBouken',
			img: '/public/images/users/BoukenDaBouken.png',
			firstname: 'Benny',
			lastname: 'Boukenda',
			birthdate: '2020-09-28',
			joindate: '2020-11-23',
			favitems: [17, 22, 25, 21, 27, 32, 34],
			owneditems: [
				{ id: 26, purchasedate: '2020-12-24' },
				{ id: 16, purchasedate: '2021-01-13' },
				{ id: 21, purchasedate: '2021-03-01' }
			]
		},
		{
			username: 'weeb',
			password: hash,
			email: 'iloveanime@gmail.com',
			displayname: 'weeb',
			img: '/public/images/users/weeb.jpg',
			firstname: 'Jon',
			lastname: 'Sumisu',
			birthdate: '2000-07-13',
			joindate: '2020-05-27',
			favitems: [4, 28, 9, 22, 32, 33, 31, 16, 30],
			owneditems: [
				{ id: 4, purchasedate: '2020-07-12' },
				{ id: 31, purchasedate: '2020-11-26' }
			]
		},
		{
			username: 'thelordofthunder',
			password: hash,
			email: 'thor@gmail.com',
			displayname: 'TheLordOfThunder',
			img: '/public/images/users/TheLordOfThunder.jpg',
			firstname: 'Thor',
			lastname: 'Odinson',
			birthdate: '964-01-01',
			joindate: '2020-12-15',
			favitems: [27, 29, 16, 20, 21],
			owneditems: [
				{ id: 12, purchasedate: '2020-12-14' },
				{ id: 32, purchasedate: '2021-01-28' }
			]
		},
		{
			username: 'powernapper',
			password: hash,
			email: 'sleepy@gmail.com',
			displayname: 'PowerNapper',
			img: '/public/images/users/PowerNapper.jpg',
			firstname: 'Le',
			lastname: 'Sloth',
			birthdate: '2020-02-27',
			joindate: '2021-03-29',
			favitems: [34, 23, 4, 9, 32],
			owneditems: [
				{ id: 16, purchasedate: '2021-04-13' }
			]
		},
		{
			username: 'totallynotadirector',
			password: hash,
			email: 'director@gmail.com',
			displayname: 'TotallyNotADirector',
			img: '/public/images/users/TotallyNotADirector.jpg',
			firstname: 'Michael',
			lastname: 'Bay',
			birthdate: '1965-02-17',
			joindate: '2020-04-25',
			favitems: [7, 34, 28, 8, 12, 29],
			owneditems: [
				{ id: 19, purchasedate: '2020-05-29' },
				{ id: 5, purchasedate: '2020-07-13' },
				{ id: 22, purchasedate: '2020-11-17' },
				{ id: 1, purchasedate: '2021-02-26' }
			]
		}
	]

	var items = [
		{
			id: 0,
			img: '/public/images/items/0.jpg',
			title: 'Sherlock Holmes',
			genres: [
				'action',
				'adventure',
				'mystery'
			],
			type: 'movie',
			price: 649.99,
			favorites: 624,
			avgrate: 2.58,
			ratings: [27, 93, 57, 16, 19],
			reviews: 212,
			summary: 'Detective Sherlock Holmes and his stalwart partner Watson engage in a battle of wits and brawn with a nemesis whose plot is a threat to all of England.'
		},
		{
			id: 1,
			img: '/public/images/items/1.jpg',
			title: 'Spider-Man: Far From Home',
			genres: [
				'action',
				'adventure',
				'fantasy',
				'scifi'
			],
			type: 'movie',
			price: 299.99,
			favorites: 1346,
			avgrate: 2.90,
			ratings: [54, 63, 47, 95, 24],
			reviews: 283,
			summary: 'Peter Parker, the beloved superhero Spider-Man, faces four destructive elemental monsters while on holiday in Europe. Soon, he receives help from Mysterio, a fellow hero with mysterious origins.'
		},
		{
			id: 2,
			img: '/public/images/items/2.png',
			title: 'Titanic',
			genres: [
				'romance'
			],
			type: 'movie',
			price: 749.99,
			favorites: 1860,
			avgrate: 3.07,
			ratings: [59, 51, 43, 26, 79],
			reviews: 258,
			summary: 'Seventeen-year-old Rose hails from an aristocratic family and is set to be married. When she boards the Titanic, she meets Jack Dawson, an artist, and falls in love with him.'
		},
		{
			id: 3,
			img: '/public/images/items/3.jpg',
			title: 'Ready Player One',
			genres: [
				'action',
				'adventure',
				'fantasy',
				'scifi'
			],
			type: 'book',
			price: 249.99,
			favorites: 1081,
			avgrate: 3.00,
			ratings: [65, 25, 27, 35, 58],
			reviews: 210,
			summary: 'James Halliday designs a virtual reality and hides the keys to his fortune in it for a worthy player to find after his death. Wade, a teenager, sets out on a quest to find the keys and the fortune.'
		},
		{
			id: 4,
			img: '/public/images/items/4.jpg',
			title: 'Your Name',
			genres: [
				'fantasy',
				'romance'
			],
			type: 'movie',
			price: 899.99,
			favorites: 1910,
			avgrate: 3.19,
			ratings: [32, 86, 86, 53, 79],
			reviews: 336,
			summary: 'Two teenagers share a profound, magical connection upon discovering they are swapping bodies. Things manage to become even more complicated when the boy and girl decide to meet in person.'
		},
		{
			id: 5,
			img: '/public/images/items/5.jpg',
			title: 'The Da Vinci Code',
			genres: [
				'mystery'
			],
			type: 'book',
			price: 299.99,
			favorites: 1307,
			avgrate: 3.35,
			ratings: [23, 28, 73, 73, 40],
			reviews: 237,
			summary: 'Symbologist Robert Langdon travels from Paris to London to unravel a bizarre murder. Accompanied by a cryptographer, he soon comes across a religious enigma protected by an age-old secret society.'
		},
		{
			id: 6,
			img: '/public/images/items/6.jpg',
			title: 'A Whisker Away',
			genres: [
				'adventure',
				'fantasy',
				'romance'
			],
			type: 'movie',
			price: 649.99,
			favorites: 1706,
			avgrate: 3.00,
			ratings: [45, 84, 4, 96, 37],
			reviews: 266,
			summary: 'The line between human and animal starts to blur after a girl transforms herself into a cat.'
		},
		{
			id: 7,
			img: '/public/images/items/7.jpg',
			title: 'Diary of a Wimpy Kid',
			genres: [
				'comedy'
			],
			type: 'book',
			price: 699.99,
			favorites: 1150,
			avgrate: 2.96,
			ratings: [28, 53, 15, 70, 14],
			reviews: 180,
			summary: 'It\'s a new school year, and Greg Heffley finds himself thrust into middle school, where undersized weaklings share the hallways with kids who are taller, meaner, and already shaving. The hazards of growing up before you\'re ready are uniquely revealed through words and drawings as Greg records them in his diary.'
		},
		{
			id: 8,
			img: '/public/images/items/8.jpg',
			title: '6 Underground',
			genres: [
				'action'
			],
			type: 'movie',
			price: 749.99,
			favorites: 777,
			avgrate: 3.44,
			ratings: [46, 38, 48, 97, 84],
			reviews: 313,
			summary: 'Six individuals from all around the globe, each the very best at what they do, have been chosen not only for their skill, but for a unique desire to delete their pasts to change the future.'
		},
		{
			id: 9,
			img: '/public/images/items/9.jpg',
			title: 'Cinderella',
			genres: [
				'fantasy'
			],
			type: 'movie',
			price: 99.99,
			favorites: 705,
			avgrate: 2.91,
			ratings: [66, 32, 98, 95, 19],
			reviews: 310,
			summary: 'A girl named Ella (Cinderella) has the purest heart living in a cruel world filled with evil stepsisters and an evil stepmother out to ruin Ella\'s life. /public. Ella gets stuck living with her \'family\' until she rides in the woods and meets a Prince. The Prince holds a ball expecting to see Ella there.'
		},
		{
			id: 10,
			img: '/public/images/items/10.jfif',
			title: 'Fast Ice',
			genres: [
				'action',
				'adventure',
				'mystery'
			],
			type: 'book',
			price: 1249.99,
			favorites: 878,
			avgrate: 3.49,
			ratings: [46, 29, 54, 78, 94],
			reviews: 301,
			summary: 'n the present day, Kurt Austin and his assistant Joe Zavala embark for the freezing edge of the world after a former NUMA colleague disappears in Antarctica. While there, they discover a photo of the Luftwaffe expedition of 1939, and are drawn into a decades-old conspiracy.'
		},
		{
			id: 11,
			img: '/public/images/items/11.jpg',
			title: 'Finding Ohana',
			genres: [
				'adventure',
				'comedy'
			],
			type: 'movie',
			price: 699.99,
			favorites: 740,
			avgrate: 3.19,
			ratings: [6, 59, 57, 10, 46],
			reviews: 178,
			summary: 'A summer in rural Oahu takes an exciting turn for two Brooklyn-raised siblings when a journal pointing to long-lost treasure sets them on an epic adventure with new friends, and leads them to reconnect with their Hawaiian heritage.'
		},
		{
			id: 12,
			img: '/public/images/items/12.jpg',
			title: 'Gone Girl',
			genres: [
				'mystery'
			],
			type: 'book',
			price: 399.99,
			favorites: 502,
			avgrate: 3.69,
			ratings: [41, 2, 20, 15, 91],
			reviews: 169,
			summary: 'On the day of his fifth wedding anniversary, Nick Dunne returns to his home in North Carthage, Missouri only to find his wife Amy missing. Presents have already been wrapped and reservations have already been made. But Nick was the suspect of her own wife\'s disappearance, since there are signs of struggle in the house.'
		},
		{
			id: 13,
			img: '/public/images/items/13.jpg',
			title: 'Interstellar',
			genres: [
				'scifi'
			],
			type: 'movie',
			price: 349.99,
			favorites: 784,
			avgrate: 3.29,
			ratings: [30, 18, 79, 3, 64],
			reviews: 194,
			summary: 'In Earth\'s future, a global crop blight and second Dust Bowl are slowly rendering the planet uninhabitable. Professor Brand (Michael Caine), a brilliant NASA physicist, is working on plans to save mankind by transporting Earth\'s population to a new home via a wormhole. But first, Brand must send former NASA pilot Cooper (Matthew McConaughey) and a team of researchers through the wormhole and across the galaxy to find out which of three planets could be mankind\'s new home.'
		},
		{
			id: 14,
			img: '/public/images/items/14.jpeg',
			title: 'John Wick: Chapter 3 — Parabellum',
			genres: [
				'action'
			],
			type: 'movie',
			price: 699.99,
			favorites: 698,
			avgrate: 3.00,
			ratings: [46, 35, 59, 23, 50],
			reviews: 213,
			summary: 'After gunning down a member of the High Table -- the shadowy international assassin\'s guild -- legendary hit man John Wick finds himself stripped of the organization\'s protective services. Now stuck with a $14 million bounty on his head, Wick must fight his way through the streets of New York as he becomes the target of the world\'s most ruthless killers.'
		},
		{
			id: 15,
			img: '/public/images/items/15.jpg',
			title: 'Mockingjay',
			genres: [
				'action',
				'adventure',
				'scifi'
			],
			type: 'book',
			price: 249.99,
			favorites: 478,

			avgrate: 3.01,
			ratings: [63, 19, 93, 77, 34],
			reviews: 286,
			summary: 'Mockingjay continues the story of Katniss Everdeen, who agrees to unify the districts of Panem in a rebellion against the tyrannical Capitol.'
		},
		{
			id: 16,
			img: '/public/images/items/16.jpg',
			title: 'Deadpool',
			genres: [
				'action',
				'adventure',
				'comedy',
				'scifi'
			],
			type: 'movie',
			price: 899.99,
			favorites: 657,
			avgrate: 2.34,
			ratings: [60, 58, 40, 3, 25],
			reviews: 186,
			summary: 'A wisecracking mercenary gets experimented on and becomes immortal but ugly, and sets out to track down the man who ruined his looks.'
		},
		{
			id: 17,
			img: '/public/images/items/17.jpeg',
			title: 'Onward',
			genres: [
				'adventure',
				'fantasy',
				'comedy'
			],
			type: 'movie',
			price: 349.99,
			favorites: 434,
			avgrate: 3.15,
			ratings: [80, 14, 7, 54, 76],
			reviews: 231,
			summary: 'Teenage elf brothers Ian and Barley embark on a magical quest to spend one more day with their late father. Like any good adventure, their journey is filled with cryptic maps, impossible obstacles and unimaginable discoveries. But when dear Mom finds out her sons are missing, she teams up with the legendary manticore to bring her beloved boys back home.'
		},
		{
			id: 18,
			img: '/public/images/items/18.jpg',
			title: 'Polar',
			genres: [
				'action'
			],
			type: 'movie',
			price: 549.99,
			favorites: 743,
			avgrate: 3.19,
			ratings: [60, 32, 31, 6, 92],
			reviews: 221,
			summary: 'The world\'s top assassin, Duncan Vizla, aka The Black Kaiser, is settling into retirement when his former employer marks him as a liability to the firm. Against his will, he finds himself back in the game going head-to-head with an army of younger, faster, ruthless killers who will stop at nothing to have him silenced.'
		},
		{
			id: 19,
			img: '/public/images/items/19.jpg',
			title: 'Shutter Island',
			genres: [
				'mystery'
			],
			type: 'movie',
			price: 549.99,
			favorites: 663,
			avgrate: 3.59,
			ratings: [15, 39, 57, 12, 89],
			reviews: 212,
			summary: 'Teddy Daniels and Chuck Aule, two US marshals, are sent to an asylum on a remote island in order to investigate the disappearance of a patient, where Teddy uncovers a shocking truth about the place.'
		},
		{
			id: 20,
			img: '/public/images/items/20.jpg',
			title: 'The Green Mile',
			genres: [
				'mystery'
			],
			type: 'movie',
			price: 1249.99,
			favorites: 793,
			avgrate: 2.60,
			ratings: [54, 89, 47, 65, 11],
			reviews: 266,
			summary: 'Paul, the head guard of a prison, meets an inmate, John, an African American who is accused of murdering two girls. His life changes drastically when he discovers that John has a special gift.'
		},
		{
			id: 21,
			img: '/public/images/items/21.jpg',
			title: 'The Proposal',
			genres: [
				'romance'
			],
			type: 'book',
			price: 399.99,
			favorites: 371,
			avgrate: 3.56,
			ratings: [14, 17, 57, 52, 48],
			reviews: 188,
			summary: 'The story of freelance writer Nik who meets handsome doctor Carlos after she turns down her boyfriend\'s surprise proposal at a Dodgers game. Carlos rescues Nik from a prying camera crew, and the two form a connection.'
		},
		{
			id: 22,
			img: '/public/images/items/22.jpg',
			title: 'The Timewaster Letters',
			genres: [
				'comedy'
			],
			type: 'book',
			price: 499.99,
			favorites: 838,
			avgrate: 3.49,
			ratings: [48, 15, 78, 59, 96],
			reviews: 296,
			summary: 'For several years, Robin Cooper has been plaguing department stores, hotels, associations, fan clubs and a certain children\'s book publisher with his letters. From Prince Charles to the Peanut Council, Harrods to the British Halibut Association - no one is safe. So who is Robin Cooper ? Architect, thimble designer, trampoline tester and wasp expert, Robin Cooper is all of these things - it just depends on the person he\'s writing to/public.'
		},
		{
			id: 23,
			img: '/public/images/items/23.jpg',
			title: 'The Lord of the Rings',
			genres: [
				'adventure',
				'fantasy'
			],
			type: 'book',
			price: 99.99,
			favorites: 752,
			avgrate: 2.78,
			ratings: [37, 62, 65, 3, 42],
			reviews: 209,
			summary: 'A young hobbit, Frodo, who has found the One Ring that belongs to the Dark Lord Sauron, begins his journey with eight companions to Mount Doom, the only place where it can be destroyed.'
		},
		{
			id: 24,
			img: '/public/images/items/24.jpg',
			title: 'Venom',
			genres: [
				'action',
				'adventure',
				'scifi'
			],
			type: 'movie',
			price: 849.99,
			favorites: 773,
			avgrate: 3.50,
			ratings: [10, 23, 74, 34, 51],
			reviews: 192,
			summary: 'While trying to take down Carlton, the CEO of Life Foundation, Eddie, a journalist, investigates experiments of human trials. Unwittingly, he gets merged with a symbiotic alien with lethal abilities.'
		},
		{
			id: 25,
			img: '/public/images/items/25.jpg',
			title: 'Vision in White',
			genres: [
				'romance'
			],
			type: 'book',
			price: 99.99,
			favorites: 526,
			avgrate: 3.40,
			ratings: [29, 11, 14, 52, 35],
			reviews: 141,
			summary: 'The story follows the relationship of photographer Mackensie \'Mac\' Elliot and English teacher Carter Maguire. Mac and her childhood friends Parker, Emma, and Laurel are the founders of Vows, a fictional wedding planning company in Connecticut.'
		},
		{
			id: 26,
			img: '/public/images/items/26.jpg',
			title: 'Total Recall',
			genres: [
				'action',
				'adventure',
				'scifi'
			],
			type: 'movie',
			price: 749.99,
			favorites: 864,
			avgrate: 2.85,
			ratings: [69, 72, 92, 25, 67],
			reviews: 325,
			summary: 'A factory worker, Douglas Quaid, begins to suspect that he is a spy after visiting Rekall - a company that provides its clients with implanted fake memories of a life they would like to have led - goes wrong and he finds himself on the run.'
		},
		{
			id: 27,
			img: '/public/images/items/27.jpg',
			title: 'Avatar',
			genres: [
				'action',
				'adventure',
				'fantasy',
				'scifi'
			],
			type: 'movie',
			price: 499.99,
			favorites: 652,
			avgrate: 3.63,
			ratings: [32, 8, 37, 4, 85],
			reviews: 166,
			summary: 'A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.'
		},
		{
			id: 28,
			img: '/public/images/items/28.jpg',
			title: 'Demon Slayer: Kimetsu no Yaiba the Movie: Mugen Train',
			genres: [
				'action',
				'fantasy'
			],
			type: 'movie',
			price: 599.99,
			favorites: 577,
			avgrate: 2.93,
			ratings: [100, 9, 53, 10, 89],
			reviews: 261,
			summary: 'After his family was brutally murdered and his sister turned into a demon, Tanjiro Kamado\'s journey as a demon slayer began. Tanjiro and his comrades embark on a new mission aboard the Mugen Train, on track to despair.'
		},
		{
			id: 29,
			img: '/public/images/items/29.png',
			title: 'Arifureta: From Commonplace to World\'s Strongest',
			genres: [
				'action',
				'adventure',
				'fantasy',
				'romance'
			],
			type: 'book',
			price: 1049.99,
			favorites: 340,
			avgrate: 2.49,
			ratings: [67, 37, 87, 5, 25],
			reviews: 221,
			summary: 'Seventeen-year-old Hajime Nagumo is your average, everyday otaku. However, his simple life of pulling all-nighters and sleeping in school is suddenly turned upside down when he, along with the rest of his class, is summoned to a fantasy world!'
		},
		{
			id: 30,
			img: '/public/images/items/30.jpg',
			title: 'Fantastic Beasts and Where to Find Them',
			genres: [
				'action',
				'fantasy'
			],
			type: 'movie',
			price: 249.99,
			favorites: 763,
			avgrate: 2.78,
			ratings: [63, 68, 84, 23, 52],
			reviews: 290,
			summary: 'The adventures of writer Newt Scamander in New York\'s secret community of witches and wizards seventy years before Harry Potter reads his book in school.'
		},
		{
			id: 31,
			img: '/public/images/items/31.jpg',
			title: 'No Game, No Life the Movie: Zero',
			genres: [
				'adventure',
				'comedy',
				'fantasy',
				'romance'
			],
			type: 'movie',
			price: 349.99,
			favorites: 411,
			avgrate: 2.53,
			ratings: [56, 47, 29, 29, 21],
			reviews: 182,
			summary: 'Adaption of the sixth Light Novel of series, it follows the story of two new characters - Riku and Shuvi - during the events of the Ancient War, prior to the 10 pledges.'
		},
		{
			id: 32,
			img: '/public/images/items/32.jpg',
			title: '3 Idiots',
			genres: [
				'comedy'
			],
			type: 'movie',
			price: 899.99,
			favorites: 799,
			avgrate: 3.89,
			ratings: [6, 3, 63, 74, 62],
			reviews: 208,
			summary: 'Two friends are searching for their long lost companion. They revisit their college days and recall the memories of their friend who inspired them to think differently, even as the rest of the world called them "idiots".'
		},
		{
			id: 33,
			img: '/public/images/items/33.jpg',
			title: 'The Irregular at Magic High School',
			genres: [
				'action',
				'scifi',
				'romance'
			],
			type: 'book',
			price: 649.99,
			favorites: 650,
			avgrate: 3.07,
			ratings: [40, 88, 97, 64, 63],
			reviews: 352,
			summary: 'The year is 2095. Magic has been tamed as another form of technology, and the practice of magic is now a rigorous discipline. Brother and sister Tatsuya and Miyuki Shiba are just about to start their first year at the renowned First Magic High School of Japan. But the school\'s ironclad rules mean that the brilliant Miyuki enters the prestigious Course 1, while her older brother, Tatsuya, is relegated to Course 2--and that\'s just the beginning of their troubles!'
		},
		{
			id: 34,
			img: '/public/images/items/34.jpg',
			title: 'The Hardy Boys',
			genres: [
				'mystery'
			],
			type: 'book',
			price: 999.99,
			favorites: 383,
			avgrate: 3.81,
			ratings: [9, 13, 24, 20, 52],
			reviews: 118,
			summary: 'A dying criminal confesses that his loot has been stored "in the tower." Both towers of the looted mansion are searched in vain. It remains for the Hardy boys to make an astonishing discovery that clears up the mystery and clears the name of a friend’s father.'
		}
	]

	var reviews = [
		{
			id: 1,
			username: 'notsus',
			rating: 3,
			review: 'It wasn\'t me. The guy clearly was red and blue; I\'m plain Red.'
		},
		{
			id: 1,
			username: 'boukendabouken',
			rating: 5,
			review: 'I really liked it! Watching it was an adventure!'
		},
		{
			id: 1,
			username: 'weeb',
			rating: 1,
			review: 'Where are the 2D girls<br><br>w h e r e'
		},
		{
			id: 1,
			username: 'thelordofthunder',
			rating: 3,
			review: 'It was nice, although it could have used a little more lightning and some gods here and there. Tell Fury I said hi.'
		},
		{
			id: 1,
			username: 'powernapper',
			rating: 2,
			review: 'Fell asleep halfway through, but it\'s kind of good.. I guess... I don\'t know, it had me sleepy...'
		},
		{
			id: 1,
			username: 'totallynotadirector',
			rating: 4,
			review: 'I like that "Far From Home" is trying something new and that its humor feels more real than the ironic cracks in most superhero movies. I just wish its good pieces all came together more satisfyingly. Even with a plot that builds off the emotional heft of Endgame, having another mediocre villain and the Disney Channel-level romance made this feel qualitatively more like a middle-weight contender. Although with that dose of comedy and romance, and some CGI-heavy battles, the film accomplishes what it needs to do.'
		},
		{
			id: 13,
			username: 'notsus',
			rating: 5,
			review: 'White\'s pretty sus. But then again all of them are White. Still, it couldn\'t be me because I\'m obviously Red.'
		},
		{
			id: 24,
			username: 'notsus',
			rating: 4,
			review: 'It was Black—I saw him eat someone.'
		},
		{
			id: 5,
			username: 'hackerman',
			rating: 3,
			review: 'Very intriguing take. Worth a read.'
		},
		{
			id: 14,
			username: 'hackerman',
			rating: 4,
			review: 'Packed with action. I\'m wary of anyone holding a book now.'
		},
		{
			id: 2,
			username: 'hackerman',
			rating: 4,
			review: 'Really an emotional movie. (SPOILER) Comes with the question of "wouldn\'t have both of them fit on that?"'
		},
		{
			id: 4,
			username: 'hackerman',
			rating: 4,
			review: 'This movie is a must-watch for anime lovers. Very much worth a rewatch.'
		}
	]

	// insert all encoded data to the bookflix database 
	db.insertMany(User, users, function (success) {
		if (success) {
			console.log("All user data successfully added to the bookflix database!")
		}
		else {
			console.log("Error occurred in adding user data to the bookflix database!")
		}
	});

	db.insertMany(Item, items, function (success) {
		if (success) {
			console.log("All item data successfully added to the bookflix database!");
		}
		else {
			console.log("Error occurred in adding item data to the bookflix database!")
		}
	});

	db.insertMany(Review, reviews, function (success) {
		if (success) {
			console.log("All review data successfully added to the bookflix database!");
		}
		else {
			console.log("Error occurred in adding review data to the bookflix database!")
		}
	});
});