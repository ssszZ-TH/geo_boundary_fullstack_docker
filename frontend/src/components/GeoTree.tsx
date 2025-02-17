// Import required libraries
import { Box, Typography, Link } from "@mui/material";
import "../styles/geotree.css"; // Import the CSS as external for styling

const TreeDiagram = () => {
  return (
    <Box>
      <Typography variant="h6">Geo Graphic Boundary Tree Diagram</Typography>
      <Typography variant="h6">เเผนภาพขอบเขตทางภูมิศาสตร์</Typography>
      <figure>
        {/* <figcaption>Geo Graphic Boundary Tree Diagram</figcaption> */}
        <ul className="tree">
          <code>Geo Bound</code>
          <ul>
            <li>
              <code>
                <Link href="/country" underline="hover">
                  country
                </Link>
              </code>
              <ul>
                <li>
                  <code>
                    <Link href="/postal_code" underline="hover">
                      postal code
                    </Link>
                  </code>
                </li>
                <li>
                  <code>
                    <Link href="/province" underline="hover">
                      province
                    </Link>
                  </code>
                  <ul>
                    <li>
                      <code>
                        <Link href="/district" underline="hover">
                          district
                        </Link>
                      </code>
                      <ul>
                        <li>
                          <code>
                            <Link href="/sub_district" underline="hover">
                              sub district
                            </Link>
                          </code>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <code>
                    <Link href="/territory" underline="hover">
                      territory
                    </Link>
                  </code>
                </li>
                <li>
                  <code>
                    <Link href="/state" underline="hover">
                      state
                    </Link>
                  </code>
                  <ul>
                    <li>
                      <code>
                        <Link href="/city" underline="hover">
                          city
                        </Link>
                      </code>
                    </li>
                    <li>
                      <code>
                        <Link href="/county" underline="hover">
                          county
                        </Link>
                      </code>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <code>
                        <Link href="/county_city" underline="hover">
                          county city
                        </Link>
                      </code>
                      <ul>
                        <li>
                          <code>
                            <Link href="/dynamic_dropdown" underline="hover">
                              dynamic_dropdow
                            </Link>
                          </code>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <code>
                <Link href="/sales_territory" underline="hover">
                  sales territory
                </Link>
              </code>
            </li>
            <li>
              <code>
                <Link href="/service_territory" underline="hover">
                  service territory
                </Link>
              </code>
            </li>
            <li>
              <code>
                <Link href="/region" underline="hover">
                  region
                </Link>
              </code>
            </li>
          </ul>
        </ul>
      </figure>
    </Box>
  );
};

export default TreeDiagram;
