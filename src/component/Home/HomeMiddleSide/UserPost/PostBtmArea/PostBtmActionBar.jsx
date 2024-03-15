import { faHeart, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSession } from 'next-auth/react';
import React, { memo, useEffect, useState } from 'react';
import { useAddCartItemMutation } from '../../../../../features/cart/cartApi';
import thousandFormate from '../../../../../utils/thousandFormate';
import LikeAction from './LikeAction';

const PostBtmActionBar = ({ id, postQueryId, postReacts,
      postUserId, postType, reacts, setCommentsShow, product,
      cartItems }) => {
      const { data: session } = useSession();
      const [reactType, setReactType] = useState("");
      const [addCartItem] = useAddCartItemMutation();
      const [isAdded, setIsAdded] = useState(false);
      // const [comment, setComment] = useState("");
      const [content, setContent] = useState(<>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.29205 1.852C8.19572 1.82127 8.0913 1.82842 8.00005 1.872C7.95484 1.89293 7.91472 1.92345 7.88249 1.96144C7.85025 1.99943 7.82667 2.04398 7.81339 2.092L7.49605 3.31466C7.3852 3.74197 7.22407 4.15463 7.01605 4.544C6.69272 5.14866 6.20405 5.61333 5.75072 6.004L4.79205 6.83066C4.71872 6.89392 4.66144 6.97368 4.62494 7.06338C4.58843 7.15309 4.57373 7.25017 4.58205 7.34666L5.12339 13.6087C5.13655 13.7608 5.20621 13.9024 5.31862 14.0057C5.43104 14.109 5.57806 14.1664 5.73072 14.1667H8.83005C10.9207 14.1667 12.6827 12.712 13.0207 10.758L13.4907 8.038C13.506 7.95034 13.5019 7.86041 13.4787 7.7745C13.4556 7.68859 13.414 7.60877 13.3567 7.54064C13.2995 7.4725 13.2281 7.41769 13.1475 7.38003C13.0669 7.34238 12.979 7.3228 12.8901 7.32266H9.43605C8.78472 7.32266 8.28939 6.73866 8.39472 6.096L8.83672 3.4C8.89727 3.03073 8.88001 2.65288 8.78605 2.29066C8.75954 2.19477 8.70921 2.10715 8.63974 2.03593C8.57027 1.96471 8.48392 1.91222 8.38872 1.88333L8.29205 1.852ZM7.56539 0.97133C7.88778 0.81623 8.25739 0.790698 8.59805 0.899997L8.69472 0.93133C9.21272 1.098 9.61672 1.51133 9.75405 2.03933C9.88272 2.53666 9.90672 3.05533 9.82339 3.562L9.38139 6.258C9.38002 6.26595 9.38042 6.2741 9.38254 6.28188C9.38466 6.28967 9.38846 6.29689 9.39367 6.30305C9.39888 6.30921 9.40537 6.31416 9.41269 6.31755C9.42001 6.32094 9.42799 6.32268 9.43605 6.32266H12.8894C13.8894 6.32266 14.6467 7.224 14.4761 8.20866L14.0061 10.9287C13.5807 13.3873 11.3807 15.1667 8.83005 15.1667H5.73072C5.32778 15.1663 4.93961 15.015 4.64279 14.7425C4.34597 14.47 4.16208 14.0961 4.12739 13.6947L3.58539 7.43266C3.56335 7.17835 3.60202 6.92245 3.69822 6.68601C3.79442 6.44957 3.9454 6.23935 4.13872 6.07266L5.09872 5.246C5.53539 4.87 5.90272 4.50533 6.13339 4.07266C6.30465 3.75313 6.43715 3.41429 6.52805 3.06333L6.84539 1.84133C6.89501 1.65273 6.98513 1.4772 7.10947 1.32695C7.23381 1.17671 7.38939 1.05535 7.56539 0.97133ZM1.97872 6.32333C2.10756 6.3177 2.23359 6.36206 2.33049 6.44716C2.42739 6.53226 2.48766 6.65151 2.49872 6.78L3.14539 14.2707C3.15634 14.3822 3.14444 14.4948 3.11041 14.6016C3.07639 14.7084 3.02095 14.8071 2.94748 14.8918C2.87401 14.9764 2.78406 15.0452 2.68312 15.0939C2.58218 15.1427 2.47237 15.1703 2.36039 15.1752C2.24841 15.18 2.13661 15.162 2.03183 15.1222C1.92706 15.0824 1.83149 15.0216 1.75097 14.9437C1.67045 14.8657 1.60668 14.7721 1.56354 14.6687C1.52039 14.5652 1.49879 14.4541 1.50005 14.342V6.82266C1.49993 6.69367 1.54967 6.56962 1.63888 6.47644C1.72808 6.38327 1.84984 6.32883 1.97872 6.32333Z" fill="#8190A3" />
            </svg>

      </>);

      useEffect(() => {
            if (reacts) {
                  const getReact = reacts?.find((react) => react?.user_id === session?.user?.email);
                  if (getReact) {
                        setReactType(getReact?.react_type);
                        if (getReact?.react_type.toLowerCase() === 'like') {
                              setContent(<>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.29205 1.852C8.19572 1.82127 8.0913 1.82842 8.00005 1.872C7.95484 1.89293 7.91472 1.92345 7.88249 1.96144C7.85025 1.99943 7.82667 2.04398 7.81339 2.092L7.49605 3.31466C7.3852 3.74197 7.22407 4.15463 7.01605 4.544C6.69272 5.14866 6.20405 5.61333 5.75072 6.004L4.79205 6.83066C4.71872 6.89392 4.66144 6.97368 4.62494 7.06338C4.58843 7.15309 4.57373 7.25017 4.58205 7.34666L5.12339 13.6087C5.13655 13.7608 5.20621 13.9024 5.31862 14.0057C5.43104 14.109 5.57806 14.1664 5.73072 14.1667H8.83005C10.9207 14.1667 12.6827 12.712 13.0207 10.758L13.4907 8.038C13.506 7.95034 13.5019 7.86041 13.4787 7.7745C13.4556 7.68859 13.414 7.60877 13.3567 7.54064C13.2995 7.4725 13.2281 7.41769 13.1475 7.38003C13.0669 7.34238 12.979 7.3228 12.8901 7.32266H9.43605C8.78472 7.32266 8.28939 6.73866 8.39472 6.096L8.83672 3.4C8.89727 3.03073 8.88001 2.65288 8.78605 2.29066C8.75954 2.19477 8.70921 2.10715 8.63974 2.03593C8.57027 1.96471 8.48392 1.91222 8.38872 1.88333L8.29205 1.852ZM7.56539 0.97133C7.88778 0.81623 8.25739 0.790698 8.59805 0.899997L8.69472 0.93133C9.21272 1.098 9.61672 1.51133 9.75405 2.03933C9.88272 2.53666 9.90672 3.05533 9.82339 3.562L9.38139 6.258C9.38002 6.26595 9.38042 6.2741 9.38254 6.28188C9.38466 6.28967 9.38846 6.29689 9.39367 6.30305C9.39888 6.30921 9.40537 6.31416 9.41269 6.31755C9.42001 6.32094 9.42799 6.32268 9.43605 6.32266H12.8894C13.8894 6.32266 14.6467 7.224 14.4761 8.20866L14.0061 10.9287C13.5807 13.3873 11.3807 15.1667 8.83005 15.1667H5.73072C5.32778 15.1663 4.93961 15.015 4.64279 14.7425C4.34597 14.47 4.16208 14.0961 4.12739 13.6947L3.58539 7.43266C3.56335 7.17835 3.60202 6.92245 3.69822 6.68601C3.79442 6.44957 3.9454 6.23935 4.13872 6.07266L5.09872 5.246C5.53539 4.87 5.90272 4.50533 6.13339 4.07266C6.30465 3.75313 6.43715 3.41429 6.52805 3.06333L6.84539 1.84133C6.89501 1.65273 6.98513 1.4772 7.10947 1.32695C7.23381 1.17671 7.38939 1.05535 7.56539 0.97133ZM1.97872 6.32333C2.10756 6.3177 2.23359 6.36206 2.33049 6.44716C2.42739 6.53226 2.48766 6.65151 2.49872 6.78L3.14539 14.2707C3.15634 14.3822 3.14444 14.4948 3.11041 14.6016C3.07639 14.7084 3.02095 14.8071 2.94748 14.8918C2.87401 14.9764 2.78406 15.0452 2.68312 15.0939C2.58218 15.1427 2.47237 15.1703 2.36039 15.1752C2.24841 15.18 2.13661 15.162 2.03183 15.1222C1.92706 15.0824 1.83149 15.0216 1.75097 14.9437C1.67045 14.8657 1.60668 14.7721 1.56354 14.6687C1.52039 14.5652 1.49879 14.4541 1.50005 14.342V6.82266C1.49993 6.69367 1.54967 6.56962 1.63888 6.47644C1.72808 6.38327 1.84984 6.32883 1.97872 6.32333Z" fill="#8190A3" />
                                    </svg>
                              </>)
                        }
                        if (getReact?.react_type.toLowerCase() === 'love') {
                              setContent(<>
                                    <FontAwesomeIcon
                                          className='post_icon text-red-500'
                                          icon={faHeart}
                                    />
                              </>)
                        }
                        if (getReact?.react_type.toLowerCase() === 'dislike') {
                              setContent(<>
                                    <FontAwesomeIcon
                                          className='post_icon text-primary'
                                          icon={faThumbsDown}
                                    />
                              </>)
                        }
                        if (!getReact?.react_type) {
                              setContent(<>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.29205 1.852C8.19572 1.82127 8.0913 1.82842 8.00005 1.872C7.95484 1.89293 7.91472 1.92345 7.88249 1.96144C7.85025 1.99943 7.82667 2.04398 7.81339 2.092L7.49605 3.31466C7.3852 3.74197 7.22407 4.15463 7.01605 4.544C6.69272 5.14866 6.20405 5.61333 5.75072 6.004L4.79205 6.83066C4.71872 6.89392 4.66144 6.97368 4.62494 7.06338C4.58843 7.15309 4.57373 7.25017 4.58205 7.34666L5.12339 13.6087C5.13655 13.7608 5.20621 13.9024 5.31862 14.0057C5.43104 14.109 5.57806 14.1664 5.73072 14.1667H8.83005C10.9207 14.1667 12.6827 12.712 13.0207 10.758L13.4907 8.038C13.506 7.95034 13.5019 7.86041 13.4787 7.7745C13.4556 7.68859 13.414 7.60877 13.3567 7.54064C13.2995 7.4725 13.2281 7.41769 13.1475 7.38003C13.0669 7.34238 12.979 7.3228 12.8901 7.32266H9.43605C8.78472 7.32266 8.28939 6.73866 8.39472 6.096L8.83672 3.4C8.89727 3.03073 8.88001 2.65288 8.78605 2.29066C8.75954 2.19477 8.70921 2.10715 8.63974 2.03593C8.57027 1.96471 8.48392 1.91222 8.38872 1.88333L8.29205 1.852ZM7.56539 0.97133C7.88778 0.81623 8.25739 0.790698 8.59805 0.899997L8.69472 0.93133C9.21272 1.098 9.61672 1.51133 9.75405 2.03933C9.88272 2.53666 9.90672 3.05533 9.82339 3.562L9.38139 6.258C9.38002 6.26595 9.38042 6.2741 9.38254 6.28188C9.38466 6.28967 9.38846 6.29689 9.39367 6.30305C9.39888 6.30921 9.40537 6.31416 9.41269 6.31755C9.42001 6.32094 9.42799 6.32268 9.43605 6.32266H12.8894C13.8894 6.32266 14.6467 7.224 14.4761 8.20866L14.0061 10.9287C13.5807 13.3873 11.3807 15.1667 8.83005 15.1667H5.73072C5.32778 15.1663 4.93961 15.015 4.64279 14.7425C4.34597 14.47 4.16208 14.0961 4.12739 13.6947L3.58539 7.43266C3.56335 7.17835 3.60202 6.92245 3.69822 6.68601C3.79442 6.44957 3.9454 6.23935 4.13872 6.07266L5.09872 5.246C5.53539 4.87 5.90272 4.50533 6.13339 4.07266C6.30465 3.75313 6.43715 3.41429 6.52805 3.06333L6.84539 1.84133C6.89501 1.65273 6.98513 1.4772 7.10947 1.32695C7.23381 1.17671 7.38939 1.05535 7.56539 0.97133ZM1.97872 6.32333C2.10756 6.3177 2.23359 6.36206 2.33049 6.44716C2.42739 6.53226 2.48766 6.65151 2.49872 6.78L3.14539 14.2707C3.15634 14.3822 3.14444 14.4948 3.11041 14.6016C3.07639 14.7084 3.02095 14.8071 2.94748 14.8918C2.87401 14.9764 2.78406 15.0452 2.68312 15.0939C2.58218 15.1427 2.47237 15.1703 2.36039 15.1752C2.24841 15.18 2.13661 15.162 2.03183 15.1222C1.92706 15.0824 1.83149 15.0216 1.75097 14.9437C1.67045 14.8657 1.60668 14.7721 1.56354 14.6687C1.52039 14.5652 1.49879 14.4541 1.50005 14.342V6.82266C1.49993 6.69367 1.54967 6.56962 1.63888 6.47644C1.72808 6.38327 1.84984 6.32883 1.97872 6.32333Z" fill="#8190A3" />
                                    </svg>

                              </>)
                        }
                  } else {
                        setContent(<>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.29205 1.852C8.19572 1.82127 8.0913 1.82842 8.00005 1.872C7.95484 1.89293 7.91472 1.92345 7.88249 1.96144C7.85025 1.99943 7.82667 2.04398 7.81339 2.092L7.49605 3.31466C7.3852 3.74197 7.22407 4.15463 7.01605 4.544C6.69272 5.14866 6.20405 5.61333 5.75072 6.004L4.79205 6.83066C4.71872 6.89392 4.66144 6.97368 4.62494 7.06338C4.58843 7.15309 4.57373 7.25017 4.58205 7.34666L5.12339 13.6087C5.13655 13.7608 5.20621 13.9024 5.31862 14.0057C5.43104 14.109 5.57806 14.1664 5.73072 14.1667H8.83005C10.9207 14.1667 12.6827 12.712 13.0207 10.758L13.4907 8.038C13.506 7.95034 13.5019 7.86041 13.4787 7.7745C13.4556 7.68859 13.414 7.60877 13.3567 7.54064C13.2995 7.4725 13.2281 7.41769 13.1475 7.38003C13.0669 7.34238 12.979 7.3228 12.8901 7.32266H9.43605C8.78472 7.32266 8.28939 6.73866 8.39472 6.096L8.83672 3.4C8.89727 3.03073 8.88001 2.65288 8.78605 2.29066C8.75954 2.19477 8.70921 2.10715 8.63974 2.03593C8.57027 1.96471 8.48392 1.91222 8.38872 1.88333L8.29205 1.852ZM7.56539 0.97133C7.88778 0.81623 8.25739 0.790698 8.59805 0.899997L8.69472 0.93133C9.21272 1.098 9.61672 1.51133 9.75405 2.03933C9.88272 2.53666 9.90672 3.05533 9.82339 3.562L9.38139 6.258C9.38002 6.26595 9.38042 6.2741 9.38254 6.28188C9.38466 6.28967 9.38846 6.29689 9.39367 6.30305C9.39888 6.30921 9.40537 6.31416 9.41269 6.31755C9.42001 6.32094 9.42799 6.32268 9.43605 6.32266H12.8894C13.8894 6.32266 14.6467 7.224 14.4761 8.20866L14.0061 10.9287C13.5807 13.3873 11.3807 15.1667 8.83005 15.1667H5.73072C5.32778 15.1663 4.93961 15.015 4.64279 14.7425C4.34597 14.47 4.16208 14.0961 4.12739 13.6947L3.58539 7.43266C3.56335 7.17835 3.60202 6.92245 3.69822 6.68601C3.79442 6.44957 3.9454 6.23935 4.13872 6.07266L5.09872 5.246C5.53539 4.87 5.90272 4.50533 6.13339 4.07266C6.30465 3.75313 6.43715 3.41429 6.52805 3.06333L6.84539 1.84133C6.89501 1.65273 6.98513 1.4772 7.10947 1.32695C7.23381 1.17671 7.38939 1.05535 7.56539 0.97133ZM1.97872 6.32333C2.10756 6.3177 2.23359 6.36206 2.33049 6.44716C2.42739 6.53226 2.48766 6.65151 2.49872 6.78L3.14539 14.2707C3.15634 14.3822 3.14444 14.4948 3.11041 14.6016C3.07639 14.7084 3.02095 14.8071 2.94748 14.8918C2.87401 14.9764 2.78406 15.0452 2.68312 15.0939C2.58218 15.1427 2.47237 15.1703 2.36039 15.1752C2.24841 15.18 2.13661 15.162 2.03183 15.1222C1.92706 15.0824 1.83149 15.0216 1.75097 14.9437C1.67045 14.8657 1.60668 14.7721 1.56354 14.6687C1.52039 14.5652 1.49879 14.4541 1.50005 14.342V6.82266C1.49993 6.69367 1.54967 6.56962 1.63888 6.47644C1.72808 6.38327 1.84984 6.32883 1.97872 6.32333Z" fill="#8190A3" />
                              </svg>

                        </>)
                  }
            } else {
                  setContent(<>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M8.29205 1.852C8.19572 1.82127 8.0913 1.82842 8.00005 1.872C7.95484 1.89293 7.91472 1.92345 7.88249 1.96144C7.85025 1.99943 7.82667 2.04398 7.81339 2.092L7.49605 3.31466C7.3852 3.74197 7.22407 4.15463 7.01605 4.544C6.69272 5.14866 6.20405 5.61333 5.75072 6.004L4.79205 6.83066C4.71872 6.89392 4.66144 6.97368 4.62494 7.06338C4.58843 7.15309 4.57373 7.25017 4.58205 7.34666L5.12339 13.6087C5.13655 13.7608 5.20621 13.9024 5.31862 14.0057C5.43104 14.109 5.57806 14.1664 5.73072 14.1667H8.83005C10.9207 14.1667 12.6827 12.712 13.0207 10.758L13.4907 8.038C13.506 7.95034 13.5019 7.86041 13.4787 7.7745C13.4556 7.68859 13.414 7.60877 13.3567 7.54064C13.2995 7.4725 13.2281 7.41769 13.1475 7.38003C13.0669 7.34238 12.979 7.3228 12.8901 7.32266H9.43605C8.78472 7.32266 8.28939 6.73866 8.39472 6.096L8.83672 3.4C8.89727 3.03073 8.88001 2.65288 8.78605 2.29066C8.75954 2.19477 8.70921 2.10715 8.63974 2.03593C8.57027 1.96471 8.48392 1.91222 8.38872 1.88333L8.29205 1.852ZM7.56539 0.97133C7.88778 0.81623 8.25739 0.790698 8.59805 0.899997L8.69472 0.93133C9.21272 1.098 9.61672 1.51133 9.75405 2.03933C9.88272 2.53666 9.90672 3.05533 9.82339 3.562L9.38139 6.258C9.38002 6.26595 9.38042 6.2741 9.38254 6.28188C9.38466 6.28967 9.38846 6.29689 9.39367 6.30305C9.39888 6.30921 9.40537 6.31416 9.41269 6.31755C9.42001 6.32094 9.42799 6.32268 9.43605 6.32266H12.8894C13.8894 6.32266 14.6467 7.224 14.4761 8.20866L14.0061 10.9287C13.5807 13.3873 11.3807 15.1667 8.83005 15.1667H5.73072C5.32778 15.1663 4.93961 15.015 4.64279 14.7425C4.34597 14.47 4.16208 14.0961 4.12739 13.6947L3.58539 7.43266C3.56335 7.17835 3.60202 6.92245 3.69822 6.68601C3.79442 6.44957 3.9454 6.23935 4.13872 6.07266L5.09872 5.246C5.53539 4.87 5.90272 4.50533 6.13339 4.07266C6.30465 3.75313 6.43715 3.41429 6.52805 3.06333L6.84539 1.84133C6.89501 1.65273 6.98513 1.4772 7.10947 1.32695C7.23381 1.17671 7.38939 1.05535 7.56539 0.97133ZM1.97872 6.32333C2.10756 6.3177 2.23359 6.36206 2.33049 6.44716C2.42739 6.53226 2.48766 6.65151 2.49872 6.78L3.14539 14.2707C3.15634 14.3822 3.14444 14.4948 3.11041 14.6016C3.07639 14.7084 3.02095 14.8071 2.94748 14.8918C2.87401 14.9764 2.78406 15.0452 2.68312 15.0939C2.58218 15.1427 2.47237 15.1703 2.36039 15.1752C2.24841 15.18 2.13661 15.162 2.03183 15.1222C1.92706 15.0824 1.83149 15.0216 1.75097 14.9437C1.67045 14.8657 1.60668 14.7721 1.56354 14.6687C1.52039 14.5652 1.49879 14.4541 1.50005 14.342V6.82266C1.49993 6.69367 1.54967 6.56962 1.63888 6.47644C1.72808 6.38327 1.84984 6.32883 1.97872 6.32333Z" fill="#8190A3" />
                        </svg>

                  </>)
            }
      }, [reacts, session]);

      useEffect(() => {
            if (cartItems?.length !== 0) {
                  const getItem = cartItems?.find(p => p.product_id === id?.toString());
                  if (getItem) {
                        setIsAdded(true);
                  }
            }
      }, [cartItems, id])

      const handleAddToCart = () => {
            if (session) {
                  const data = {
                        product_id: id,
                        user_id: session?.user?.email,
                        amount: price
                  }
                  addCartItem(data);
            } else {
                  alert("please login first")
            }
      }

      return (
            <div className='w-full flex items-center justify-between gap-4 px-3 py-2'>
                  {/* like and comment */}
                  <div className='flex items-center gap-3'>
                        {/* like action */}
                        <div className='group cursor-pointer flex items-center gap-1 relative'>
                              <LikeAction
                                    id={id}
                                    postType={postType}
                                    reactType={reactType}
                                    postQueryId={postQueryId}
                                    postUserId={postUserId}
                              />
                              {content}
                              <span className='text-xs sm:text-base font-medium text-gray-600'>{postReacts.length}</span>
                        </div>
                        {/* comment */}

                        {
                              postType === "Product" &&
                              <div onClick={() => setCommentsShow(prevState => !prevState)} className='w-fit flex items-center gap-1 cursor-pointer hover:underline'>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M0.875 2.47916C0.875 1.91566 1.33233 1.45833 1.89583 1.45833H12.1042C12.6677 1.45833 13.125 1.91566 13.125 2.47916V9.77083C13.125 10.0416 13.0174 10.3012 12.826 10.4927C12.6346 10.6841 12.3749 10.7917 12.1042 10.7917H6.45167L4.36742 12.8759C4.24845 12.9944 4.09705 13.0751 3.93232 13.1077C3.76758 13.1403 3.59688 13.1234 3.44173 13.0592C3.28658 12.9949 3.15393 12.8861 3.06048 12.7466C2.96704 12.6071 2.917 12.443 2.91667 12.2751V10.7917H1.89583C1.62509 10.7917 1.36544 10.6841 1.174 10.4927C0.982552 10.3012 0.875 10.0416 0.875 9.77083V2.47916ZM1.89583 2.33333C1.85716 2.33333 1.82006 2.34869 1.79271 2.37604C1.76536 2.40339 1.75 2.44048 1.75 2.47916V9.77083C1.75 9.85133 1.81533 9.91666 1.89583 9.91666H3.35417C3.4702 9.91666 3.58148 9.96276 3.66353 10.0448C3.74557 10.1269 3.79167 10.2381 3.79167 10.3542V12.215L5.96167 10.045C6.00223 10.0043 6.05042 9.97207 6.10347 9.95005C6.15652 9.92803 6.21339 9.91668 6.27083 9.91666H12.1042C12.1428 9.91666 12.1799 9.9013 12.2073 9.87395C12.2346 9.8466 12.25 9.80951 12.25 9.77083V2.47916C12.25 2.44048 12.2346 2.40339 12.2073 2.37604C12.1799 2.34869 12.1428 2.33333 12.1042 2.33333H1.89583Z" fill="#8190A3" />
                                    </svg>

                                    <span className='text-xs sm:text-base font-medium text-gray-600'>0</span>
                              </div>
                        }
                  </div>
                  {/* product details */}
                  {
                        postType === "Product" &&
                        <div className='flex flex-wrap gap-2 items-center'>
                              {/* price */}
                              <div className='flex items-center gap-1 text-sm'>
                                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M6.99988 0.5L6.84338 0.64L1.13988 6.4065L0.796875 6.7505L1.14038 7.1105L5.89038 11.8605L6.25038 12.204L6.59538 11.8605L12.3604 6.157L12.4999 6V0.5H6.99988ZM7.42188 1.5H11.4999V5.578L6.24988 10.797L2.20288 6.75L7.42188 1.5ZM9.99988 2.5C9.86727 2.5 9.74009 2.55268 9.64632 2.64645C9.55255 2.74021 9.49988 2.86739 9.49988 3C9.49988 3.13261 9.55255 3.25979 9.64632 3.35355C9.74009 3.44732 9.86727 3.5 9.99988 3.5C10.1325 3.5 10.2597 3.44732 10.3534 3.35355C10.4472 3.25979 10.4999 3.13261 10.4999 3C10.4999 2.86739 10.4472 2.74021 10.3534 2.64645C10.2597 2.55268 10.1325 2.5 9.99988 2.5Z" fill="#8190A3" />
                                    </svg>
                                    <span>Price:</span>
                                    <span className='font-semibold'>{thousandFormate(+product?.price)}</span>
                              </div>
                              {/* type */}
                              <div className='flex items-center gap-1 text-sm'>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M6.66683 2H3.7335C3.62741 2 3.52567 2.04214 3.45065 2.11716C3.37564 2.19217 3.3335 2.29391 3.3335 2.4V13.6C3.3335 13.7061 3.37564 13.8078 3.45065 13.8828C3.52567 13.9579 3.62741 14 3.7335 14H6.66683M7.3335 4.66667H8.66683M7.3335 8H8.66683M7.3335 11.3333H8.66683M9.3335 2H12.2668C12.3729 2 12.4747 2.04214 12.5497 2.11716C12.6247 2.19217 12.6668 2.29391 12.6668 2.4V13.6C12.6668 13.7061 12.6247 13.8078 12.5497 13.8828C12.4747 13.9579 12.3729 14 12.2668 14H9.3335" stroke="#8190A3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <span>Type:</span>
                                    <span className='font-semibold'>{product?.type}</span>
                              </div>
                              {/* stock availability */}
                              <div className='flex items-center gap-1 text-sm'>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M9.23569 2.56901C9.29641 2.50614 9.33001 2.42194 9.32925 2.33454C9.32849 2.24714 9.29344 2.16354 9.23163 2.10173C9.16983 2.03993 9.08623 2.00487 8.99883 2.00412C8.91143 2.00336 8.82723 2.03695 8.76436 2.09767L8.00003 2.86201L7.23569 2.09767C7.20495 2.06584 7.16816 2.04044 7.1275 2.02297C7.08683 2.0055 7.04309 1.99631 6.99883 1.99592C6.95457 1.99554 6.91067 2.00397 6.86971 2.02073C6.82874 2.03749 6.79153 2.06224 6.76023 2.09354C6.72893 2.12484 6.70418 2.16206 6.68742 2.20302C6.67066 2.24399 6.66223 2.28788 6.66261 2.33214C6.66299 2.3764 6.67219 2.42014 6.68966 2.46081C6.70713 2.50148 6.73252 2.53826 6.76436 2.56901L7.52869 3.33334L6.76436 4.09767C6.70364 4.16054 6.67004 4.24474 6.6708 4.33214C6.67156 4.41954 6.70662 4.50314 6.76842 4.56495C6.83022 4.62675 6.91383 4.6618 7.00123 4.66256C7.08863 4.66332 7.17283 4.62973 7.23569 4.56901L8.00003 3.80467L8.76436 4.56901C8.82691 4.63151 8.91172 4.66661 9.00014 4.66657C9.08857 4.66654 9.17336 4.63139 9.23586 4.56884C9.29836 4.50629 9.33346 4.42148 9.33343 4.33306C9.3334 4.24463 9.29824 4.15984 9.23569 4.09734L8.47136 3.33334L9.23569 2.56901Z" fill="#8190A3" />
                                          <path fill-rule="evenodd" clip-rule="evenodd" d="M2.22815 8.81632L3.33348 9.18466V12C3.33348 12.0693 3.35509 12.1369 3.3953 12.1933C3.43551 12.2498 3.49231 12.2923 3.55782 12.315L7.88848 13.814C7.95692 13.8386 8.03157 13.8399 8.10082 13.8177L8.10548 13.8163L8.11048 13.8147L12.4425 12.315C12.508 12.2923 12.5648 12.2498 12.605 12.1933C12.6452 12.1369 12.6668 12.0693 12.6668 12V9.18466L13.7722 8.81632C13.8231 8.79937 13.8693 8.77034 13.9066 8.73171C13.944 8.69308 13.9714 8.64599 13.9866 8.59446C14.0019 8.54293 14.0044 8.48849 13.994 8.43576C13.9837 8.38304 13.9607 8.3336 13.9271 8.29166L12.5938 6.62499C12.5543 6.57576 12.5016 6.53877 12.4418 6.51833L8.10915 5.01833C8.03854 4.99389 7.96176 4.99389 7.89115 5.01833L3.55848 6.51833C3.49873 6.53875 3.44601 6.57574 3.40648 6.62499L2.07315 8.29166C2.03956 8.3336 2.01661 8.38304 2.00625 8.43576C1.99589 8.48849 1.99843 8.54293 2.01366 8.59446C2.02888 8.64599 2.05634 8.69308 2.09368 8.73171C2.13103 8.77034 2.17716 8.79937 2.22815 8.81632ZM7.10648 10.191L7.66682 9.39099V13.032L4.00015 11.7627V9.40666L6.72815 10.316C6.7963 10.3386 6.86994 10.3387 6.93811 10.3161C7.00628 10.2935 7.06534 10.2498 7.10648 10.191ZM4.68582 6.83333L8.00015 7.98066L11.3145 6.83333L8.00015 5.68599L4.68582 6.83333ZM8.89382 10.191L8.33348 9.39132V13.0323L12.0001 11.763V9.40666L9.27215 10.316C9.204 10.3386 9.13036 10.3387 9.06219 10.3161C8.99402 10.2935 8.93496 10.2498 8.89382 10.191ZM3.78015 7.22533L2.89248 8.33499L4.72948 8.94732L6.70282 9.60499L7.47382 8.50399L7.42882 8.48833L3.78015 7.22499V7.22533ZM13.1078 8.33499L12.2201 7.22499L8.52648 8.50399L9.29748 9.60499L13.1078 8.33499Z" fill="#8190A3" />
                                    </svg>
                                    <span>In Stock:</span>
                                    {
                                          product?.status === "In-Stock" ?
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                      <path d="M8.29414 16.998C7.85914 16.998 7.44714 16.795 7.18314 16.445L3.61014 11.724C3.49967 11.5782 3.41902 11.4121 3.3728 11.2351C3.32659 11.0581 3.3157 10.8737 3.34078 10.6925C3.36585 10.5113 3.4264 10.3369 3.51894 10.1791C3.61149 10.0213 3.73423 9.88331 3.88014 9.77299C4.026 9.66222 4.19228 9.58131 4.36946 9.53492C4.54665 9.48853 4.73124 9.47756 4.91268 9.50264C5.09411 9.52772 5.2688 9.58837 5.42675 9.68109C5.5847 9.77381 5.7228 9.8968 5.83314 10.043L8.18414 13.147L14.0951 3.65499C14.2912 3.34159 14.6035 3.11874 14.9636 3.03532C15.3238 2.95189 15.7023 3.01471 16.0161 3.20999C16.6691 3.61599 16.8701 4.47599 16.4621 5.12999L9.47814 16.34C9.35891 16.5322 9.19458 16.6924 8.99941 16.8067C8.80423 16.9211 8.58411 16.986 8.35814 16.996C8.33614 16.998 8.31614 16.998 8.29414 16.998Z" fill="#16A34A" />
                                                </svg> :
                                                <span className='font-semibold'>{`X`}</span>
                                    }
                              </div>
                              {/* cart button */}
                              {/* cart button */}
                              <div onClick={handleAddToCart} className={`group bg-gray-200 p-1 grid place-items-center rounded-full cursor-pointer active:scale-95 duration-150 hover:bg-orange-500 ${isAdded ? "bg-orange-500" : ""}`}>
                                    {/* <FontAwesomeIcon className={`group-hover:text-white ${isAdded ? "text-white" : "text-orange-500"}`} icon={faCartPlus} /> */}
                                    <svg className='stroke-[#4CAF50] group-hover:stroke-white' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <g clip-path="url(#clip0_405_1586)">
                                                <path d="M3 4.5H21L18.75 14.25H5.25M18.75 17.25H6L2.25 1.5H0" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M17.25 21.75C18.0784 21.75 18.75 21.0784 18.75 20.25C18.75 19.4216 18.0784 18.75 17.25 18.75C16.4216 18.75 15.75 19.4216 15.75 20.25C15.75 21.0784 16.4216 21.75 17.25 21.75Z" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M7.5 21.75C8.32843 21.75 9 21.0784 9 20.25C9 19.4216 8.32843 18.75 7.5 18.75C6.67157 18.75 6 19.4216 6 20.25C6 21.0784 6.67157 21.75 7.5 21.75Z" stroke-linecap="round" stroke-linejoin="round" />
                                          </g>
                                          <defs>
                                                <clipPath id="clip0_405_1586">
                                                      <rect width="24" height="24" fill="white" />
                                                </clipPath>
                                          </defs>
                                    </svg>

                              </div>
                        </div>
                  }
                  {/* comment */}
                  {
                        postType === "General" &&
                        <div onClick={() => setCommentsShow(prevState => !prevState)} className='w-fit flex items-center gap-1 cursor-pointer hover:underline'>
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.875 2.47916C0.875 1.91566 1.33233 1.45833 1.89583 1.45833H12.1042C12.6677 1.45833 13.125 1.91566 13.125 2.47916V9.77083C13.125 10.0416 13.0174 10.3012 12.826 10.4927C12.6346 10.6841 12.3749 10.7917 12.1042 10.7917H6.45167L4.36742 12.8759C4.24845 12.9944 4.09705 13.0751 3.93232 13.1077C3.76758 13.1403 3.59688 13.1234 3.44173 13.0592C3.28658 12.9949 3.15393 12.8861 3.06048 12.7466C2.96704 12.6071 2.917 12.443 2.91667 12.2751V10.7917H1.89583C1.62509 10.7917 1.36544 10.6841 1.174 10.4927C0.982552 10.3012 0.875 10.0416 0.875 9.77083V2.47916ZM1.89583 2.33333C1.85716 2.33333 1.82006 2.34869 1.79271 2.37604C1.76536 2.40339 1.75 2.44048 1.75 2.47916V9.77083C1.75 9.85133 1.81533 9.91666 1.89583 9.91666H3.35417C3.4702 9.91666 3.58148 9.96276 3.66353 10.0448C3.74557 10.1269 3.79167 10.2381 3.79167 10.3542V12.215L5.96167 10.045C6.00223 10.0043 6.05042 9.97207 6.10347 9.95005C6.15652 9.92803 6.21339 9.91668 6.27083 9.91666H12.1042C12.1428 9.91666 12.1799 9.9013 12.2073 9.87395C12.2346 9.8466 12.25 9.80951 12.25 9.77083V2.47916C12.25 2.44048 12.2346 2.40339 12.2073 2.37604C12.1799 2.34869 12.1428 2.33333 12.1042 2.33333H1.89583Z" fill="#8190A3" />
                              </svg>
                              <span className='text-xs sm:text-base font-medium text-gray-600'>0</span>
                        </div>
                  }
            </div>
      );
};

export default memo(PostBtmActionBar);