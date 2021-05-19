import firebase from "firebase";

export default async function helper(req, res) {
  const uid = req.body.uid;
  if (!uid) {
    res.status(400).json({
      m: "no data!",
    });
    return;
  }
  let userLoc = {};
  try {
    const docref = firebase.firestore().collection("cookies").doc(uid);
    const doc = await docref.get();
    if (doc.exists) {
      const data = await doc.data();
      userLoc = {
        city: data.city,
        country: data.country,
      };
    }
  } catch (err) {
    console.log(err);
  }
  res.status(200).json({
    m: userLoc,
  });
}
