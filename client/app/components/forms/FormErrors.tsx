type ErrorProps = {
  errors: { [x: string]: string };
  field: string;
};

function FormErrors({ errors, field }: ErrorProps): JSX.Element | null {
  console.log(errors, "from form errors");

  // Check if there is an error message for the specified field
  if (errors[field]) {
    return (
      <div className="text-red-800 text-sm w-full bg-red-200 py-1 px-2">
        <p>{errors[field]}</p>
      </div>
    );
  }

  // Return null if there is no error message for the specified field
  return null;
}

export default FormErrors;
