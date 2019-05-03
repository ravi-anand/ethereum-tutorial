import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x9AFE7E3289fbBbBBb7e7A2bAD136a02b2F17180F'
);

export default instance
