import { dagJson } from '@helia/dag-json';
import express from 'express';
import * as IPFS from 'ipfs-core';
const router = express.Router();
router.use(async (req, res, next) => {
  next();
});

/**
 * @swagger
 * /api/add-to-ipfs:
 *   get:
 *     parameters:
 *       - in: query
 *         name: content
 *         description: content
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { message: 'Sample response' }
 */

router.get('/add-to-ipfs', async (req, res) => {
  const ipfs = await IPFS.create();
  const content = req.query.content;
  const { cid } = await ipfs.add(content);
  console.info(cid);
  return res.send({ cid });
});

/**
 * @swagger
 * /api/get-from-ipfs:
 *   get:
 *     summary: Get a sample resource
 *     description: Get a sample resource from the server
 *     parameters:
 *       - in: query
 *         name: contentId
 *         description: contentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { message: 'Sample response' }
 */

router.get('/get-from-ipfs', async (req, res) => {
  const { helia } = req;
  const d = dagJson(helia);
  const cidParam = req.query.contentId;

  const cid = CID.parse(cidParam);

  console.log('cid', cid);
  // Retrieve data from IPFS
  const retrievedData = await d.get(cid.toString());

  return res.send({ content: retrievedData });
});

export { router };
