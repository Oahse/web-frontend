import { paymentMethods } from '@/services/helper';

export const PaymentOptions = ({ method, onChange }) => {
    return (
        <div>
            {paymentMethods
                .filter(pm => pm.enabled)
                .map((paymentMethod) => (
                    <div key={paymentMethod.id} className="fieldset-radio mb_20">
                        <input
                            type="radio"
                            name="payment"
                            id={paymentMethod.id}
                            className="tf-check"
                            value={paymentMethod.id}
                            checked={method?.id === paymentMethod.id}
                            onChange={() => onChange(paymentMethod)}
                            
                        />
                        <label htmlFor={paymentMethod.id} className="ms-2">
                            {paymentMethod.name}
                        </label>
                    </div>
                ))
            }
        </div>
    );
};

export default PaymentOptions;
