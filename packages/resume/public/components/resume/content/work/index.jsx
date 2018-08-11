import Link from "@randy.tarampi/jsx/lib/components/link";
import PropTypes from "prop-types";
import React, {Fragment} from "react";
import ResumeSection from "../section";
import ResumeWorkEntry from "./entry";

export const ResumeWork = ({resume}) => {
    return <ResumeSection
        type="work"
        label="Work"
        descriptionNode={
            <Fragment>
                <p><span className="text">I met the CTO at Fetch Auto 5 years ago as an intern at Pulse Energy and have been pretty inseparable until now</span></p>
                <p><span className="text">It's time to strike it out on my own though &mdash; he got me to come back and work with him not once, but twice, and I'm looking for a place where I can settle down and build similarly close working relationships</span></p>
                <p><span className="text">Ask me about how I ended up learning Italian on the job, my cadres of co-op students, or when I almost <Link
                    href="http://www.quickmeme.com/p/3vv8p3">brought down a busy test environment</Link> as an intern</span>
                </p>
            </Fragment>
        }
    >
        {
            resume.work.map((workEntry, index) => {
                return <ResumeWorkEntry workEntry={workEntry} key={index} index={index}/>;
            })
        }
    </ResumeSection>;
};

ResumeWork.propTypes = {
    resume: PropTypes.object.isRequired
};

export default ResumeWork;
