const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen  px-4">
            <h1 className="text-5xl sm:text-6xl font-bold text-red-600 mb-4">404</h1>
            <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-800 text-center">Page Not Found</h2>
            <p className="text-gray-600 mb-6 text-center text-base sm:text-lg">
                Sorry, the page you are looking for does not exist.
            </p>
            <a
                href="/"
                className="px-4 py-2 sm:px-6 sm:py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm sm:text-base"
            >
                Go Home
            </a>
        </div>
    );
};

export default ErrorPage;
