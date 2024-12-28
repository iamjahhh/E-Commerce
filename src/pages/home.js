function Home() {
  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <div className="flash-sale-header mb-4">
        <h2 className="text-center">⚡ Flash Sale</h2>
        <p className="text-center text-danger">Ends in 24:00:00</p>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="col">
            <div className="card h-100 shadow-sm">
              <div className="placeholder-glow">
                <div className="card-img-top placeholder" style={{ height: "200px" }}></div>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="badge bg-danger">-50%</span>
                  <span className="text-muted"><s>$100.00</s></span>
                </div>
                <h5 className="card-title placeholder-glow">
                  <span className="placeholder col-6"></span>
                </h5>
                <p className="card-text placeholder-glow">
                  <span className="placeholder col-7"></span>
                  <span className="placeholder col-4"></span>
                  <span className="placeholder col-4"></span>
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="text-danger m-0">$50.00</h5>
                  <button className="btn btn-dark btn-sm">Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
