import { h, FunctionalComponent } from "preact";

import { notNil } from "../../libs/typeguards";

interface ErrorCardProps {
  title?: string;
  error?: any;
}

const formatError = (error?: any): string | undefined => {
  try {
    return JSON.stringify(error, null, 2);
  } catch {
    return;
  }
};

export const ErrorCard: FunctionalComponent<ErrorCardProps> = ({
  title = "An Error Occurred",
  error,
}) => {
  const formattedError = formatError(error);

  return (
    <div class="pwa-4 bra-1 ct-error">
      <h2>{title}</h2>
      {notNil(formattedError) ? (
        <pre class="ova-au">{formattedError}</pre>
      ) : null}
    </div>
  );
};
