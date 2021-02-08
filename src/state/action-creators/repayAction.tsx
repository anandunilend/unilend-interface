import { Dispatch } from "redux";
import { collateralAddress } from "../../ethereum/contracts";
import { UnilendLBContract } from "../../ethereum/contracts/UnilendLBContract";
import { ActionType } from "../action-types";
import { RepayAction } from "../actions/repayA";

export const getOweValue = (
  unilendLbRouter: string,
  selectedAccount: string
) => {
  return async (dispatch: Dispatch<RepayAction>) => {
    let unilendLBRouter = UnilendLBContract(unilendLbRouter);
    unilendLBRouter.methods
      .getCollateralAmount(collateralAddress, selectedAccount)
      .call((error: any, result: any) => {
        // console.log(error, result);

        if (!error && result) {
          dispatch({
            type: ActionType.YOU_OWE,
            payload: result,
          });
        } else {
          dispatch({
            type: ActionType.YOU_OWE,
            payload: "0",
          });
        }
      });
  };
};