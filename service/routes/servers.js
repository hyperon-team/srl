import express from 'express';
import request from '../lib/request';

const router = express.Router();

router.get('/', (req, res) => {
  // Get servers from db
  // Response with error if there is an error
  // Return server list
  res.send({ ok: 1 });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  // Get server with id of 'id' from db
  // Response with error if server not found Or there is an error
  // Return server
  res.send({ ok: 1 });
});

router.post('/:invite', (req, res) => {
  // Invite should be invite CODE.
  const { invite } = req.params;
  const { desc } = req.query;
  // Check description if needed
  request
    .get(`https://discordapp.com/api/v6/invites/${invite}`)
    .then(body => JSON.parse(body))
    .then(body => {
      // Invite information
      console.log(body);
      // Invite validation
      // Error if invite is not valid
      // Error if user is not the owner of the server
      // Get server info ( Icon (probably not needed), Name )
      // Add info to db
      res.send({ ok: 1 });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  // Get server with id of 'id' from db
  // Response with error if server not found Or there is an error
  const { desc } = req.query;
  // Check description if needed

  // Getting guild invite
  const { invite } = guild;
  request
    .get(`https://discordapp.com/api/v6/invites/${invite}`)
    .then(body => JSON.parse(body))
    .then(body => {
      // Invite information
      console.log(body);
      // Invite validation
      // Error if invite is not valid
      // Error if user is not the owner of the server
      // Update information about the server
      res.send({ ok: 1 });
    });
});

export default router;
