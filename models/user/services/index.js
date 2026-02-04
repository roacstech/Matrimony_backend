// const db = require("../../../config/db");

// exports.submitForm = async (user, f) => {
//   await db.query(
//     `INSERT INTO user_forms (
//       user_id, full_name, gender, dob, birth_time, marital_status,
//       education, occupation, income, email,
//       father_name, mother_name, grandfather_name, grandmother_name, siblings,
//       raasi, star, dosham, birth_place,
//       horoscope_uploaded, horoscope_file_name, horoscope_file_url,
//       religion, caste, address, city, country,
//       privacy, photo, is_public
//     ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
//     [
//       user.id,
//       f.fullName,
//       f.gender,
//       f.dob,
//       f.birthTime,
//       f.maritalStatus,
//       f.education,
//       f.occupation,
//       f.income,
//       user.email,
//       f.father,
//       f.mother,
//       f.grandfather,
//       f.grandmother,
//       f.siblings,
//       f.raasi,
//       f.star,
//       f.dosham,
//       f.birthPlace,
//       f.horoscope ? 1 : 0,
//       f.horoscope?.name || null,
//       f.horoscope?.url || null,
//       f.religion,
//       f.caste,
//       f.address,
//       f.city,
//       f.country,
//       f.privacy,
//       f.photo || null,
//       f.privacy === "Public" ? 1 : 0,
//     ]
//   );

//   // 🔥 update user status
//   await db.query(
//     "UPDATE users SET status='PENDING' WHERE id=?",
//     [user.id]
//   );
// };


const db = require("../../../config/db");

module.exports.submitProfile = async (payload) => {
  try {
   const insertData = {
  full_name: payload.fullName,
  gender: payload.gender,
  dob: payload.dob,
  birth_time: payload.birthTime,

  marital_status: payload.maritalStatus,
  education: payload.education,
  occupation: payload.occupation,
  income: payload.income,

  father_name: payload.father,
  mother_name: payload.mother,
  grandfather_name: payload.grandfather,
  grandmother_name: payload.grandmother,
  siblings: payload.siblings,

  raasi: payload.raasi,
  star: payload.star,
  dosham: payload.dosham,
  birth_place: payload.city,

  religion: payload.religion,
  caste: payload.caste,

  address: payload.address,
  city: payload.city,
  country: payload.country,
  privacy: payload.privacy,

  horoscope_uploaded: payload.horoscope ? 1 : 0,
  horoscope_file_url: payload.horoscope
    ? payload.horoscope.originalname
    : null,

  photo: payload.photo
    ? payload.photo.originalname
    : null,

  is_public: payload.privacy === "Public" ? 1 : 0,
  created_at: new Date()
};


    const [id] = await db("profiles").insert(insertData);

    return {
      success: true,
      message: "Profile submitted successfully",
      data: { id }
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
};
