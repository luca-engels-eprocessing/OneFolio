"use server"
import { Configuration, CountryCode, CreditAccountSubtype, DepositoryAccountSubtype, LinkTokenCreateRequest, LinkTokenCreateResponse, PlaidApi, PlaidEnvironments, Products } from 'plaid';
import { removeFromUser } from './db';

declare global {
  var plaidClient: PlaidApi | undefined;
}

const configuration_sandbox = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET_SANDBOX,
    },
  },
});
const configuration_production = new Configuration({
  basePath: PlaidEnvironments.production,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET_PRODUCTION,
    },
  },
});

const plaidClient = globalThis.plaidClient || new PlaidApi(configuration_sandbox); 
// const plaidClient = globalThis.plaidClient || (process.env.NODE_ENV !== "production")? new PlaidApi(configuration_production): new PlaidApi(configuration_sandbox);

if (process.env.NODE_ENV !== "production") globalThis.plaidClient = plaidClient;

export const createLinkToken = async (user: {id:string,name:{firstname:string,lastname:string},address:any}) => {
  const request: LinkTokenCreateRequest = {
    user: {
      client_user_id: user.id,
    },
    client_name: 'OneFolio',
    products: ['transactions'] as Products[],
    country_codes: ["DE"] as CountryCode[],
    language: 'de',
    account_filters: {
      depository: {
        account_subtypes: ['checking', 'savings'] as DepositoryAccountSubtype[],
      },
      credit: {
        account_subtypes: ['credit card', 'paypal'] as CreditAccountSubtype[],
      },
    },
  };

  try {
    const response = await plaidClient.linkTokenCreate(request);
    return response.data;
  } catch (error:any) {
    if (error && error.response) {
      // Plaid API error
      console.error("Plaid API error:", error.response.data);
    } else {
      // Other error
      console.error("Error:", error.message);
    }
    throw error;
  }
};

export const exchangeToken = async (token: string) => {
  try {
    const response = await plaidClient.itemPublicTokenExchange({ public_token: token });
    return response.data
  
  } catch (err: any) {
    if (err.response) {
      // Plaid API error
      console.error("Plaid API error:", err.response);
    } else {
      // Other error
      console.error("Error:", err);
    }
    throw err;
  }
};

export const transactionSync = async (accessToken: string,userId:string,cursor:string|undefined) =>  {
  // const request = { access_token: accessToken,options:{include_original_description:true} }
  const request = { access_token: accessToken,cursor:cursor,options:{include_original_description:true} }
  try {
    const response = await plaidClient.transactionsSync(request);
    return response.data
  } catch (err: any) {
    if (err.response) {
      // Plaid API error
      
      if(err.response.data.error_code=="INVALID_ACCESS_TOKEN"){
        removeFromUser(userId,{"access_token":""})
        removeFromUser(userId,{"cursor":cursor})
      }
      console.error("Plaid API error:", err.response);
    } else {
      // Other error
      console.error("Error:", err);
    }
    throw err;
  }
}

export const removeAccessToken = async (accessToken: string)=>{
  try {
    const response = await plaidClient.itemRemove({access_token:accessToken})
    return response.data
  }  catch (err: any) {
    if (err.response) {
      // Plaid API error
      console.error("Plaid API error:", err.response);
    } else {
      // Other error
      console.error("Error:", err);
    }
    throw err;
  }
}