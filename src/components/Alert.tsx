import type { AlertT } from "../types"

type AlertProps = {
    alert: AlertT | null;
};

function Alert({ alert }: AlertProps) {
    if (!alert?.msg) return null;

    return (
        <div className={`alert ${alert.type}`}>
            {alert.msg}
        </div>
    );
}

export default Alert;
