
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import {Container } from "@mui/material"
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";


export default function GlobalContainer(params,children) {
    const dispatch = useDispatch();
    const { showFunction } = useSelector((state) => state.actions);
    const {Breakpoints} = useSelector((state) => state.actions);
    const [showComponent, setShowComponent] =useState(true);
    
    return (
        <Container maxWidth={Breakpoints.value}>
            {children}
        </Container>
      );

};
