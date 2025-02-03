import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSearch } from "../hooks/useSearch";
import { NavBar } from "../components/NavBar";
import { PhotoCard } from "../components/PhotoCard";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ModalView } from "../components/ModalViews";
import "./HomePage.css";

const HomePage: React.FC = () => {
    const [query, setQuery] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);
    const [photos, setPhotos] = useState<any[]>([]);

    const location = useLocation();
    const navigate = useNavigate();

    const adjustedQuery = query || "popular";
    const { data, isLoading, isError } = useSearch(adjustedQuery, page);

    const observer = useRef<IntersectionObserver | null>(null);
    const debounceTimeout = useRef<number | null>(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchQuery = urlParams.get("query");
        if (searchQuery) {
            setQuery(searchQuery);
        }
    }, [location.search]);

    const handleQueryChange = (newQuery: string) => {
        setQuery(newQuery);

        navigate(`/?query=${newQuery}`, { replace: true });

        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        debounceTimeout.current = window.setTimeout(() => {
            const previousHistory = JSON.parse(
                localStorage.getItem("searchHistory") || "[]"
            );
            const updatedHistory = previousHistory.includes(newQuery)
                ? previousHistory
                : [...previousHistory, newQuery];
                localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
        }, 500);
    };

    useEffect(() => {
        setPage(1);
        setPhotos([]);
    }, [query]);

    useEffect(() => {
        if (data?.results) {
            setPhotos((prevPhotos) => [...prevPhotos, ...data.results]);
        }
    }, [data]);

    const lastPhotoRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (isLoading || !node) return;

            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting && !isLoading) {
                        setPage((prev) => prev + 1);
                    }
                },
                {
                    threshold: 0.9,
                }
            );

            observer.current.observe(node);
        },
        [isLoading]
    );

    if (isError) return <div>Error loading photos!</div>;

  return (
    <div className="home-container">
        <NavBar query={query} setQuery={handleQueryChange} />
        <div className="search">
            <input
                type="text"
                placeholder="Search for photos..."
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
            />
        </div>

        {!photos.length && (
            <div className="no-results">
                No results found for "{query}". Try searching for something else.
            </div>
        )}

        <div className="photo-grid">
            {photos.map((photo: any, index: number) => (
                <div
                    key={photo.id}
                    ref={index === photos.length - 1 ? lastPhotoRef : null}
                >
                    <PhotoCard
                        photo={photo}
                        onClick={() => setSelectedPhoto(photo)}
                    />
                </div>
            ))}
        </div>

        {isLoading && <div><AiOutlineLoading3Quarters />Loading</div>}

        {selectedPhoto && (
            <ModalView
                open={!!selectedPhoto}
                onClose={() => setSelectedPhoto(null)}
                photo={selectedPhoto}
            />
        )}
    </div>
  );
};

export default HomePage;
