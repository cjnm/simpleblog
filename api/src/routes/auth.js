import express from 'express';
import axios from 'axios';
import { getGithubAuthURI, getGithubAccesstokenURI } from '../utils/auth.js';

const authRouter = express.Router();

authRouter.get('/github', (req, res) => {
    const githubAuthURI = getGithubAuthURI();
    res.redirect(githubAuthURI);
})

authRouter.get('/github/callback', async (req, res) => {
    try {
        const { code } = req.query;

        //get access token
        let response = await axios.post(getGithubAccesstokenURI(code), {}, { headers: { Accept: 'application/json' } });
        const { access_token } = response.data;

        //get user info
        let user_response = await axios.get('https://api.github.com/user', { headers: { Authorization: `token ${access_token}` } });

        //preapre user info
        const { login: username, id, avatar_url, name, email } = user_response.data;


    } catch (error) {
        console.log(error);
        res.redirect('/');
    }

})

export default authRouter;