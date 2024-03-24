import jwt from 'jsonwebtoken';
import users from '../models/auth.js';
import bcrypt from 'bcryptjs';

export const login = async (req, res) => {
    const { email } = req.body;
    try {
        const existingUser = await users.findOne({ email });
        if (!existingUser) {
            try {
                const newUser = await users.create({ email });

                const token = jwt.sign({
                    email: newUser.email, id: newUser._id
                }, process.env.JWT_SECRET, {
                    expiresIn: '1h'
                })

                const userDetails = {
                    _id: newUser._id,
                    email: newUser.email,
                    name: newUser.name,
                    desc: newUser.desc,
                    avatarImgURL: newUser.avatarImgURL,
                    profileImgURL: newUser.profileImgURL,
                    joinedOn: newUser.joinedOn,
                    createdAt: newUser.createdAt,
                    __v: newUser.__v
                };

                res.status(200).json({ result: userDetails, token })
            } catch (error) {
                res.status(500).json({ mess: "Something wents wrong..." });
            }
        } else {
            const token = jwt.sign({
                email: existingUser.email, id: existingUser._id
            }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            })

            const userDetails = {
                _id: existingUser._id,
                email: existingUser.email,
                name: existingUser.name,
                desc: existingUser.desc,
                avatarImgURL: existingUser.avatarImgURL,
                profileImgURL: existingUser.profileImgURL,
                joinedOn: existingUser.joinedOn,
                createdAt: existingUser.createdAt,
                __v: existingUser.__v
            };

            res.status(200).json({ result: userDetails, token })
        }
    } catch (error) {
        res.status(500).json({ mess: "Something wents wrong..." })
    }
}

export const signUp = async (req, res) => {
    const { email } = req.body;
    const name = req.body.name;

    try {
        const existingUser = await users.findOne({ email });
        if (!existingUser) {
            try {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(req.body.password, salt)
                const newUser = await users.create({ email, password: hash, name });

                const token = jwt.sign({
                    email: newUser.email, id: newUser._id
                }, process.env.JWT_SECRET, {
                    expiresIn: '1h'
                })

                const userDetails = {
                    _id: newUser._id,
                    email: newUser.email,
                    name: newUser.name,
                    desc: newUser.desc,
                    avatarImgURL: newUser.avatarImgURL,
                    profileImgURL: newUser.profileImgURL,
                    joinedOn: newUser.joinedOn,
                    createdAt: newUser.createdAt,
                    __v: newUser.__v
                };

                res.status(200).json({ result: userDetails, token })
            } catch (error) {
                res.status(500).json({ message: "Something wents wrong..." });
            }
        } else {
            return res.status(400).json({ message: "Email Id already exists!" })
        }
    } catch (error) {
        res.status(500).json({ message: "Something wents wrong..." })
    }
}

export const signIn = async (req, res) => {
    const { email } = req.body;

    try {
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            try {
                if (!existingUser.password) {
                    return res.status(404).json({ message: "Password doesn't exists for this email!" })
                }

                const isCorrect = bcrypt.compareSync(req.body.password, existingUser.password);

                if (!isCorrect) return res.status(400).json({ message: "Wrong Credentials!" })

                const token = jwt.sign({
                    email: existingUser.email, id: existingUser._id
                }, process.env.JWT_SECRET, {
                    expiresIn: '1h'
                })

                const userDetails = {
                    _id: existingUser._id,
                    email: existingUser.email,
                    name: existingUser.name,
                    desc: existingUser.desc,
                    avatarImgURL: existingUser.avatarImgURL,
                    profileImgURL: existingUser.profileImgURL,
                    joinedOn: existingUser.joinedOn,
                    createdAt: existingUser.createdAt,
                    __v: existingUser.__v
                };

                res.status(200).json({ result: userDetails, token })
            } catch (error) {
                res.status(500).json({ message: "Something wents wrong..." });
            }
        } else {
            return res.status(404).json({ message: "Email Id doesn't exists!" })
        }
    } catch (error) {
        res.status(500).json({ message: "Something wents wrong..." })
    }
}
