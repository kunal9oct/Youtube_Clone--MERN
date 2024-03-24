import users from '../models/auth.js';

export const update = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            if (req.body.avatarImgURL) {
                req.body = { ['avatarImgURL']: req.body.avatarImgURL, ['profileImgURL']: null }
            }

            if (req.file) {
                req.body = { ['profileImgURL']: req.file.filename, ['avatarImgURL']: null };
            }

            const updatedUser = await users.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },
                { new: true });

            const userDetails = {
                _id: updatedUser._id,
                email: updatedUser.email,
                name: updatedUser.name,
                desc: updatedUser.desc,
                avatarImgURL: updatedUser.avatarImgURL,
                profileImgURL: updatedUser.profileImgURL,
                joinedOn: updatedUser.joinedOn,
                createdAt: updatedUser.createdAt,
                __v: updatedUser.__v
            };
            res.status(200).json({ result: userDetails });
        } catch (error) {
            next(error);
        }
    } else {
        return res.status(403).json({
            status: 403,
            message: "You can only update own account!",
        })
    }
}
