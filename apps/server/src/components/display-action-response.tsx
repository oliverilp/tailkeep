// interface ServerActionProps {
//   result: {
//     data?: {
//       message?: string;
//     };
//     serverError?: string;
//     fetchError?: string;
//     validationErrors?: Record<string, string[] | undefined> | undefined;
//   };
// }
//
// export function DisplayServerActionResponse({ result }: ServerActionProps) {
//   const { data, serverError, fetchError, validationErrors } = result;
//
//   return (
//     <>
//       {/* Success Message */}
//       {data?.message ? <h2 className="my-2 text-2xl">{data.message}</h2> : null}
//
//       {serverError ? (
//         <div className="my-2 text-red-500">
//           <p>{serverError}</p>
//         </div>
//       ) : null}
//
//       {fetchError ? (
//         <div className="my-2 text-red-500">
//           <p>{fetchError}</p>
//         </div>
//       ) : null}
//
//       {validationErrors ? (
//         <div className="my-2 text-red-500">
//           {Object.keys(validationErrors).map((key) => (
//             <p
//               key={key}
//             >{`${key}: ${validationErrors && validationErrors[key as keyof typeof validationErrors]}`}</p>
//           ))}
//         </div>
//       ) : null}
//     </>
//   );
// }
