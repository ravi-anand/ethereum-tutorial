import React, { Component } from 'react';
import Layout from '../../components/layout';
import Campaign from '../../ethereum/campaign';
import { Card, Grid } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/contributeForm';

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();

    return {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestCount: summary[2],
      approversCount: summary[3],
      manager: summary[4]
    };
  }

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestCount,
      approversCount
    } = this.props;

    const items = [
      {
        header: manager,
        meta: 'Address of manager',
        description: 'The manager created this campaign and can create request to withdrwa money',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (Wei)',
        description: ' You must contribute at least this much wei to become an approver'
      },
      {
        header: requestCount,
        meta: 'Number of Requests',
        description: 'A request tries to withdrwa money from the contract. requests must be approved by approvers'
      },
      {
        header: approversCount,
        meta: 'Number of approvers',
        description: 'Number of people who have already donated to this Campaign'
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign balance (ether)',
        description: 'The balance is how much money this campaign has left to spend'
      }
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3> Campaign show</h3>
        <Grid>
          <Grid.Column width={10}>
          {this.renderCards()}
          </Grid.Column>

          <Grid.Column width={6}>
            <ContributeForm address={this.props.address}/>
          </Grid.Column>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;