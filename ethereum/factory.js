import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x46059983025fBeB3FB7cEd8481363532c88c4A21'
);

export default instance
