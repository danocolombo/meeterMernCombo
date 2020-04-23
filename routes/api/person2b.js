const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Person = require('../../models/Person');

// @route    POST api/person
// @desc     Register person
// @access   Public
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, status } = req.body;

    try {
      let person = await Person.findOne({ name });

      if (person) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Person already exists' }] });
      }

      // const avatar = gravatar.url(email, {
      //   s: '200',
      //   r: 'pg',
      //   d: 'mm'
      // });

      person = new Person({
        name,
        email,
        phone,
        status
      });
      await person.save();

      const payload = {
        person: {
          id: person.id
        }
      };
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
